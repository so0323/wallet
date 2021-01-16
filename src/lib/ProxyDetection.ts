import { Transaction, TransactionState } from '@/stores/Transactions';
import { useProxyStore } from '@/stores/Proxy';
import { useAddressStore } from '@/stores/Address';

export enum ProxyType {
    CASHLINK = 'cashlink',
    HTLC_PROXY = 'htlc-proxy',
}

export enum ProxyTransactionDirection {
    FUND = 'fund',
    REDEEM = 'redeem',
}

function proxyTransactionIdentifierToExtraData(identifier: string) {
    const extraData = new Uint8Array([
        0, // leading 0 to mark identifier extra data
        ...(identifier.split('').map((c) => c.charCodeAt(0) + 63)), // mapped to outside of basic ascii range
    ]);
    // convert to hex
    return extraData.reduce((hex, value) => hex + value.toString(16).padStart(2, '0'), '');
}

const ProxyExtraData = {
    [ProxyType.CASHLINK]: {
        [ProxyTransactionDirection.FUND]: proxyTransactionIdentifierToExtraData('CASH'),
        [ProxyTransactionDirection.REDEEM]: proxyTransactionIdentifierToExtraData('LINK'),
    },
    [ProxyType.HTLC_PROXY]: {
        [ProxyTransactionDirection.FUND]: proxyTransactionIdentifierToExtraData('HPFD'), // HTLC Proxy Funding
        [ProxyTransactionDirection.REDEEM]: proxyTransactionIdentifierToExtraData('HPRD'), // HTLC Proxy Redeeming
    },
};

export function isProxyData(
    data: string,
    proxyType?: ProxyType,
    transactionDirection?: ProxyTransactionDirection,
): boolean {
    data = data.toLowerCase();
    const proxyTypesToCheck = proxyType ? [proxyType] : Object.values(ProxyType);
    const directionsToCheck = transactionDirection
        ? [transactionDirection]
        : [ProxyTransactionDirection.FUND, ProxyTransactionDirection.REDEEM];
    return proxyTypesToCheck.some((type) => directionsToCheck.some((dir) => ProxyExtraData[type][dir] === data));
}

// Get the proxy address of a proxy transaction. The tx must have been checked before to be an actual proxy transaction.
export function getProxyAddress(tx: Transaction): string {
    const { state: addresses$ } = useAddressStore();
    // Note: cashlink transactions always hold the proxy extra data. Also swap proxy transactions from or to our address
    // hold the proxy extra data. Only the htlc creation transactions from a proxy hold the htlc data instead.
    const isFunding = isProxyData(tx.data.raw, undefined, ProxyTransactionDirection.FUND)
        || !!addresses$.addressInfos[tx.sender] // sent from one of our addresses
        || useProxyStore().allProxies.value.some((proxy) => tx.recipient === proxy); // sent to proxy
    return isFunding ? tx.recipient : tx.sender;
}

export function handleProxyTransaction(
    tx: Transaction,
    knownProxyTransactions: {[proxyAddress: string]: {[transactionHash: string]: Transaction}},
): Transaction | null {
    const proxyAddress = getProxyAddress(tx);
    const proxyTransactions = Object.values(knownProxyTransactions[proxyAddress]) || [tx];
    const isCashlink = isProxyData(tx.data.raw, ProxyType.CASHLINK);
    const isFunding = proxyAddress === tx.recipient;

    // Check if the related tx is already known.
    // This can be the case when I send proxies/cashlinks between two of my own addresses,
    // or when the transaction that is added right now is triggered by the proxy's
    // transaction-history or subscription.

    const { addFundedProxy, addClaimedProxy, removeProxy } = useProxyStore();
    const { state: addresses$ } = useAddressStore();

    let relatedTx: Transaction | undefined;
    if (tx.relatedTransactionHash) {
        relatedTx = proxyTransactions.find((proxyTx) => proxyTx.transactionHash === tx.relatedTransactionHash);
    } else {
        // Find related transaction
        // Note that the proxy might be reused and we have to find the right related tx amongst others. Also note that
        // we don't detect the related transaction by proxy extra data because it is not required to include this data.
        // Also note that our available potentialRelatedTxs depend on which transactions have already been fetched from
        // the network and which not. Thus, there might be a slight non-determinism due to the order in which network
        // responses reach us.
        const potentialRelatedTxs = proxyTransactions.filter((proxyTx) =>
            // only consider the ones not related to another transaction yet
            !proxyTx.relatedTransactionHash
            // ignore invalid or expired transactions
            && proxyTx.state !== TransactionState.INVALIDATED
            && proxyTx.state !== TransactionState.EXPIRED
            // at least one of the transactions must be from or to one of our addresses
            && (!!addresses$.addressInfos[tx.sender] || !!addresses$.addressInfos[tx.recipient]
                || !!addresses$.addressInfos[proxyTx.sender] || !!addresses$.addressInfos[proxyTx.recipient])
            // check whether this is a potential related tx
            && (isFunding
                // proxy tx is redeeming
                ? (proxyTx.sender === proxyAddress
                    // is the redeeming tx later?
                    && (tx.timestamp && proxyTx.timestamp
                        ? tx.timestamp < proxyTx.timestamp
                        : tx.blockHeight && proxyTx.blockHeight
                            ? tx.blockHeight < proxyTx.blockHeight
                            // a tx's validity start height can also be earlier than the height at which it gets
                            // broadcast, thus this check can be off, but typically, this is not the case
                            : tx.validityStartHeight <= proxyTx.validityStartHeight)
                    // check the tx amount
                    && (isCashlink
                        // for cashlinks, partial redeeming is allowed
                        ? tx.value >= proxyTx.value + proxyTx.fee
                        // other proxies must be redeemed entirely
                        : tx.value === proxyTx.value + proxyTx.fee)
                )
                // proxy tx is funding
                : (proxyTx.recipient === proxyAddress
                    // is the redeeming tx earlier?
                    && (tx.timestamp && proxyTx.timestamp
                        ? tx.timestamp > proxyTx.timestamp
                        : tx.blockHeight && proxyTx.blockHeight
                            ? tx.blockHeight > proxyTx.blockHeight
                            // a tx's validity start height can also be earlier than the height at which it gets
                            // broadcast, thus this check can be off, but typically, this is not the case
                            : tx.validityStartHeight >= proxyTx.validityStartHeight)
                    // check the tx amount
                    && (isCashlink
                        // for cashlinks, partial redeeming is allowed
                        ? tx.value + tx.fee <= proxyTx.value
                        // other proxies must be redeemed entirely
                        : tx.value + tx.fee === proxyTx.value)
                )
            ),
        );

        // If there are multiple matching transactions (if any) pick the one which is time wise the closest.
        // For a funding tx that is the earliest redeeming tx and for a redeeming tx the latest funding tx (LIFO).
        // Note that we iterate the transactions in Transactions.ts from most recent to oldest to ensure correct LIFO
        // assignments for funding transactions. Otherwise for funding transactions A and B and redeeming transaction C,
        // A-C would be matched instead of B-C for given transaction order A B C.
        const isCloser = (checkedValue: number, currentBest: number) => isFunding
            ? checkedValue < currentBest
            : checkedValue > currentBest;
        for (const potentialRelatedTx of potentialRelatedTxs) {
            if (!relatedTx
                || (!!relatedTx.timestamp && !!potentialRelatedTx.timestamp
                    ? isCloser(potentialRelatedTx.timestamp, relatedTx.timestamp)
                    : !!relatedTx.blockHeight && !!potentialRelatedTx.blockHeight
                        ? isCloser(potentialRelatedTx.blockHeight, relatedTx.blockHeight)
                        : isCloser(potentialRelatedTx.validityStartHeight, relatedTx.validityStartHeight))) {
                relatedTx = potentialRelatedTx;
            }
        }
    }

    // Check whether we need to subscribe for network updates for the proxy address. This is the case if we don't know
    // the related transaction for a tx yet or if there is a transaction from or to the proxy which is not confirmed yet
    // and not related to one of our addresses which we are observing anyways.
    const needToSubscribeToProxy = !relatedTx || proxyTransactions.some((proxyTx) =>
        // If there is a transaction for which we don't know the related tx yet, we have to subscribe.
        // However, for the currently checked tx and its related tx we allow relatedTransactionHash to not be set yet as
        // it will only later be set in Transactions.ts. Instead, we separately test for !relatedTx before.
        // Note that we don't set the relatedTransactionsHash on the current tx here in ProxyDetection, as manipulation
        // of transaction store data should only be happening in the transaction store.
        (!proxyTx.relatedTransactionHash
            && proxyTx.transactionHash !== tx.transactionHash && proxyTx.transactionHash !== relatedTx!.transactionHash)
        // Is the tx not confirmed yet and not related to one of our subscribed addresses?
        || (proxyTx.state !== TransactionState.CONFIRMED
            && !addresses$.addressInfos[proxyTx.sender] && !addresses$.addressInfos[proxyTx.recipient]),
    );

    if (needToSubscribeToProxy) {
        if (isFunding) {
            // Store proxy, which triggers checking for related tx, or subscribing for future txs
            addFundedProxy(proxyAddress);
        } else {
            // Store proxy, which triggers checking for related tx
            addClaimedProxy(proxyAddress);
        }
    } else {
        // if the proxy doesn't need to be subscribed for any of its transactions anymore, remove it
        removeProxy(proxyAddress);
    }

    return relatedTx || null;
}
