/* eslint-disable max-len */

export const USDC_CONTRACT_ABI = [
    // 'event Approval(address indexed owner, address indexed spender, uint256 value)',
    // 'event AuthorizationCanceled(address indexed authorizer, bytes32 indexed nonce)',
    // 'event AuthorizationUsed(address indexed authorizer, bytes32 indexed nonce)',
    // 'event Blacklisted(address indexed account)',
    'event MetaTransactionExecuted(address userAddress, address relayerAddress, bytes functionSignature)',
    // 'event Pause()',
    // 'event RescuerChanged(address indexed newRescuer)',
    // 'event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole)',
    // 'event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender)',
    // 'event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender)',
    'event Transfer(address indexed from, address indexed to, uint256 value)',
    // 'event UnBlacklisted(address indexed account)',
    // 'event Unpause()',
    // 'function APPROVE_WITH_AUTHORIZATION_TYPEHASH() view returns (bytes32)',
    // 'function BLACKLISTER_ROLE() view returns (bytes32)',
    // 'function CANCEL_AUTHORIZATION_TYPEHASH() view returns (bytes32)',
    // 'function DECREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH() view returns (bytes32)',
    // 'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
    // 'function DEPOSITOR_ROLE() view returns (bytes32)',
    // 'function DOMAIN_SEPARATOR() view returns (bytes32)',
    // 'function EIP712_VERSION() view returns (string)',
    // 'function INCREASE_ALLOWANCE_WITH_AUTHORIZATION_TYPEHASH() view returns (bytes32)',
    // 'function META_TRANSACTION_TYPEHASH() view returns (bytes32)',
    // 'function PAUSER_ROLE() view returns (bytes32)',
    // 'function PERMIT_TYPEHASH() view returns (bytes32)',
    // 'function RESCUER_ROLE() view returns (bytes32)',
    // 'function TRANSFER_WITH_AUTHORIZATION_TYPEHASH() view returns (bytes32)',
    // 'function WITHDRAW_WITH_AUTHORIZATION_TYPEHASH() view returns (bytes32)',
    // 'function allowance(address owner, address spender) view returns (uint256)',
    // 'function approve(address spender, uint256 amount) returns (bool)',
    // 'function approveWithAuthorization(address owner, address spender, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)',
    // 'function authorizationState(address authorizer, bytes32 nonce) view returns (uint8)',
    'function balanceOf(address account) view returns (uint256)',
    // 'function blacklist(address account)',
    // 'function blacklisters() view returns (address[])',
    // 'function cancelAuthorization(address authorizer, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)',
    // 'function decimals() view returns (uint8)',
    // 'function decreaseAllowance(address spender, uint256 subtractedValue) returns (bool)',
    // 'function decreaseAllowanceWithAuthorization(address owner, address spender, uint256 decrement, uint256 validAfter, uint256 validBefore, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)',
    // 'function deposit(address user, bytes depositData)',
    // 'function executeMetaTransaction(address userAddress, bytes functionSignature, bytes32 sigR, bytes32 sigS, uint8 sigV) payable returns (bytes)',
    // 'function getRoleAdmin(bytes32 role) view returns (bytes32)',
    // 'function getRoleMember(bytes32 role, uint256 index) view returns (address)',
    // 'function getRoleMemberCount(bytes32 role) view returns (uint256)',
    // 'function grantRole(bytes32 role, address account)',
    // 'function hasRole(bytes32 role, address account) view returns (bool)',
    // 'function increaseAllowance(address spender, uint256 addedValue) returns (bool)',
    // 'function increaseAllowanceWithAuthorization(address owner, address spender, uint256 increment, uint256 validAfter, uint256 validBefore, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)',
    // 'function initialize(string newName, string newSymbol, uint8 newDecimals, address childChainManager)',
    // 'function initialized() view returns (bool)',
    // 'function isBlacklisted(address account) view returns (bool)',
    // 'function name() view returns (string)',
    'function nonces(address owner) view returns (uint256)',
    // 'function pause()',
    // 'function paused() view returns (bool)',
    // 'function pausers() view returns (address[])',
    // 'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
    // 'function renounceRole(bytes32 role, address account)',
    // 'function rescueERC20(address tokenContract, address to, uint256 amount)',
    // 'function rescuers() view returns (address[])',
    // 'function revokeRole(bytes32 role, address account)',
    // 'function symbol() view returns (string)',
    // 'function totalSupply() view returns (uint256)',
    // 'function transfer(address recipient, uint256 amount) returns (bool)',
    // 'function transferFrom(address sender, address recipient, uint256 amount) returns (bool)',
    // 'function transferWithAuthorization(address from, address to, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)',
    // 'function unBlacklist(address account)',
    // 'function unpause()',
    // 'function updateMetadata(string newName, string newSymbol)',
    // 'function withdraw(uint256 amount)',
    // 'function withdrawWithAuthorization(address owner, uint256 value, uint256 validAfter, uint256 validBefore, bytes32 nonce, uint8 v, bytes32 r, bytes32 s)',
];

export const USDC_TRANSFER_CONTRACT_ABI = [
    // 'constructor()',
    // 'event DomainRegistered(bytes32 indexed domainSeparator, bytes domainValue)',
    // 'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
    // 'event RequestTypeRegistered(bytes32 indexed typeHash, string typeStr)',
    // 'function EIP712_DOMAIN_TYPE() view returns (string)',
    // 'function deposits(address) view returns (uint256)',
    // 'function domains(bytes32) view returns (bool)',
    // 'function execute(tuple(address from, address to, uint256 value, uint256 gas, uint256 nonce, bytes data, uint256 validUntil) request, bytes32 domainSeparator, bytes32 requestTypeHash, bytes suffixData, bytes signature) payable returns (bool success, bytes ret)',
    'function getGasAndDataLimits() view returns (tuple(uint256 acceptanceBudget, uint256 preRelayedCallGasLimit, uint256 postRelayedCallGasLimit, uint256 calldataSizeLimit) limits)',
    // 'function getHubAddr() view returns (address)',
    // 'function getMinimumRelayFee(tuple(uint256 gasPrice, uint256 pctRelayFee, uint256 baseRelayFee, address relayWorker, address paymaster, address forwarder, bytes paymasterData, uint256 clientId) relayData) view returns (uint256 amount)',
    'function getNonce(address from) view returns (uint256)',
    // 'function getRelayHubDeposit() view returns (uint256)',
    // 'function getRequiredRelayFee(tuple(uint256 gasPrice, uint256 pctRelayFee, uint256 baseRelayFee, address relayWorker, address paymaster, address forwarder, bytes paymasterData, uint256 clientId) relayData, bytes4 methodId) view returns (uint256 amount)',
    'function getRequiredRelayGas(bytes4 methodId) view returns (uint256 gas)',
    // 'function isTrustedForwarder(address forwarder) view returns (bool)',
    // 'function owner() view returns (address)',
    // 'function postRelayedCall(bytes context, bool success, uint256 gasUseWithoutPost, tuple(uint256 gasPrice, uint256 pctRelayFee, uint256 baseRelayFee, address relayWorker, address paymaster, address forwarder, bytes paymasterData, uint256 clientId) relayData)',
    // 'function preRelayedCall(tuple(tuple(address from, address to, uint256 value, uint256 gas, uint256 nonce, bytes data, uint256 validUntil) request, tuple(uint256 gasPrice, uint256 pctRelayFee, uint256 baseRelayFee, address relayWorker, address paymaster, address forwarder, bytes paymasterData, uint256 clientId) relayData) relayRequest, bytes signature, bytes approvalData, uint256 maxPossibleGas) returns (bytes context, bool revertOnRecipientRevert)',
    // 'function registerDomainSeparator(string name, string version)',
    // 'function registerRequestType(string typeName, string typeSuffix)',
    // 'function registerToken(address token, address pool)',
    'function registeredTokenPool(address) view returns (address)',
    // 'function registeredTokenPoolFee(address token) view returns (uint24 fee)',
    // 'function renounceOwnership()',
    // 'function requiredRelayGas() view returns (uint256)',
    // 'function setGasAndDataLimits(tuple(uint256 acceptanceBudget, uint256 preRelayedCallGasLimit, uint256 postRelayedCallGasLimit, uint256 calldataSizeLimit) limits)',
    // 'function setMaxRequiredRelayGas(uint256 gas)',
    // 'function setRelayHub(address hub)',
    // 'function setRequiredRelayGas(bytes4 methodId, uint256 gas)',
    // 'function setWrappedChainToken(address _wrappedChainToken)',
    // 'function transfer(address token, uint256 amount, address target, uint256 fee)',
    // 'function transferOwnership(address newOwner)',
    'function transferWithApproval(address token, uint256 amount, address target, uint256 fee, uint256 approval, bytes32 sigR, bytes32 sigS, uint8 sigV)',
    // 'function trustedForwarder() view returns (address forwarder)',
    // 'function typeHashes(bytes32) view returns (bool)',
    // 'function uniswapV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes _data)',
    // 'function unregisterToken(address token)',
    // 'function verify(tuple(address from, address to, uint256 value, uint256 gas, uint256 nonce, bytes data, uint256 validUntil) forwardRequest, bytes32 domainSeparator, bytes32 requestTypeHash, bytes suffixData, bytes signature) view',
    // 'function versionPaymaster() view returns (string)',
    // 'function versionRecipient() view returns (string)',
    // 'function withdraw(uint256 amount, address target)',
    // 'function withdrawRelayHubDeposit(uint256 amount, address target)',
    // 'function withdrawToken(address token, uint256 amount, address target)',
    // 'function wrappedChainToken() view returns (address)',
];

// TODO add variable names
export const RELAY_HUB_CONTRACT_ABI = [
    // 'constructor(address,address,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256)',
    // 'event Deposited(address indexed,address indexed,uint256)',
    // 'event HubDeprecated(uint256)',
    // 'event OwnershipTransferred(address indexed,address indexed)',
    // 'event RelayHubConfigured(tuple(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))',
    'event RelayServerRegistered(address indexed,uint256,uint256,string)',
    // 'event RelayWorkersAdded(address indexed,address[],uint256)',
    // 'event TransactionRejectedByPaymaster(address indexed,address indexed,address indexed,address,address,bytes4,uint256,bytes)',
    'event TransactionRelayed(address indexed,address indexed,address indexed,address,address,bytes4,uint8,uint256)',
    // 'event TransactionResult(uint8,bytes)',
    // 'event Withdrawn(address indexed,address indexed,uint256)',
    // 'function G_NONZERO() view returns (uint256)',
    // 'function addRelayWorkers(address[])',
    // 'function balanceOf(address) view returns (uint256)',
    // 'function calculateCharge(uint256,tuple(uint256,uint256,uint256,address,address,address,bytes,uint256)) view returns (uint256)',
    'function calldataGasCost(uint256) view returns (uint256)',
    // 'function depositFor(address) payable',
    // 'function deprecateHub(uint256)',
    // 'function deprecationBlock() view returns (uint256)',
    // 'function getConfiguration() view returns (tuple(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))',
    // 'function innerRelayCall(tuple(tuple(address,address,uint256,uint256,uint256,bytes,uint256), tuple(uint256, uint256, uint256, address, address, address, bytes, uint256)),bytes,bytes,tuple(uint256,uint256,uint256,uint256), uint256, uint256) returns(uint8, bytes)',
    // 'function isDeprecated() view returns (bool)',
    // 'function isRelayManagerStaked(address) view returns (bool)',
    // 'function owner() view returns (address)',
    // 'function penalize(address,address)',
    // 'function penalizer() view returns (address)',
    // 'function registerRelayServer(uint256,uint256,string)',
    // 'function relayCall(uint256,tuple(tuple(address,address,uint256,uint256,uint256,bytes,uint256), tuple(uint256, uint256, uint256, address, address, address, bytes, uint256)),bytes,bytes,uint256) returns (bool, bytes)',
    // 'function renounceOwnership()',
    // 'function setConfiguration(tuple(uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256,uint256))',
    // 'function stakeManager() view returns (address)',
    // 'function transferOwnership(address)',
    // 'function versionHub() view returns (string)',
    // 'function withdraw(uint256,address)',
    // 'function workerCount(address) view returns (uint256)',
    // 'function workerToManager(address) view returns (address)'
];

export const UNISWAP_POOL_CONTRACT_ABI = [
    // 'event Burn(address indexed owner, int24 indexed tickLower, int24 indexed tickUpper, uint128 amount, uint256 amount0, uint256 amount1)',
    // 'event Collect(address indexed owner, address recipient, int24 indexed tickLower, int24 indexed tickUpper, uint128 amount0, uint128 amount1)',
    // 'event CollectProtocol(address indexed sender, address indexed recipient, uint128 amount0, uint128 amount1)',
    // 'event Flash(address indexed sender, address indexed recipient, uint256 amount0, uint256 amount1, uint256 paid0, uint256 paid1)',
    // 'event IncreaseObservationCardinalityNext(uint16 observationCardinalityNextOld, uint16 observationCardinalityNextNew)',
    // 'event Initialize(uint160 sqrtPriceX96, int24 tick)',
    // 'event Mint(address sender, address indexed owner, int24 indexed tickLower, int24 indexed tickUpper, uint128 amount, uint256 amount0, uint256 amount1)',
    // 'event SetFeeProtocol(uint8 feeProtocol0Old, uint8 feeProtocol1Old, uint8 feeProtocol0New, uint8 feeProtocol1New)',
    // 'event Swap(address indexed sender, address indexed recipient, int256 amount0, int256 amount1, uint160 sqrtPriceX96, uint128 liquidity, int24 tick)',
    // 'function burn(int24 tickLower, int24 tickUpper, uint128 amount) returns (uint256 amount0, uint256 amount1)',
    // 'function collect(address recipient, int24 tickLower, int24 tickUpper, uint128 amount0Requested, uint128 amount1Requested) returns (uint128 amount0, uint128 amount1)',
    // 'function collectProtocol(address recipient, uint128 amount0Requested, uint128 amount1Requested) returns (uint128 amount0, uint128 amount1)',
    // 'function factory() view returns (address)',
    'function fee() view returns (uint24)',
    // 'function feeGrowthGlobal0X128() view returns (uint256)',
    // 'function feeGrowthGlobal1X128() view returns (uint256)',
    // 'function flash(address recipient, uint256 amount0, uint256 amount1, bytes data)',
    // 'function increaseObservationCardinalityNext(uint16 observationCardinalityNext)',
    // 'function initialize(uint160 sqrtPriceX96)',
    // 'function liquidity() view returns (uint128)',
    // 'function maxLiquidityPerTick() view returns (uint128)',
    // 'function mint(address recipient, int24 tickLower, int24 tickUpper, uint128 amount, bytes data) returns (uint256 amount0, uint256 amount1)',
    // 'function observations(uint256 index) view returns (uint32 blockTimestamp, int56 tickCumulative, uint160 secondsPerLiquidityCumulativeX128, bool initialized)',
    // 'function observe(uint32[] secondsAgos) view returns (int56[] tickCumulatives, uint160[] secondsPerLiquidityCumulativeX128s)',
    // 'function positions(bytes32 key) view returns (uint128 _liquidity, uint256 feeGrowthInside0LastX128, uint256 feeGrowthInside1LastX128, uint128 tokensOwed0, uint128 tokensOwed1)',
    // 'function protocolFees() view returns (uint128 token0, uint128 token1)',
    // 'function setFeeProtocol(uint8 feeProtocol0, uint8 feeProtocol1)',
    // 'function slot0() view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)',
    // 'function snapshotCumulativesInside(int24 tickLower, int24 tickUpper) view returns (int56 tickCumulativeInside, uint160 secondsPerLiquidityInsideX128, uint32 secondsInside)',
    // 'function swap(address recipient, bool zeroForOne, int256 amountSpecified, uint160 sqrtPriceLimitX96, bytes data) returns (int256 amount0, int256 amount1)',
    // 'function tickBitmap(int16 wordPosition) view returns (uint256)',
    // 'function tickSpacing() view returns (int24)',
    // 'function ticks(int24 tick) view returns (uint128 liquidityGross, int128 liquidityNet, uint256 feeGrowthOutside0X128, uint256 feeGrowthOutside1X128, int56 tickCumulativeOutside, uint160 secondsPerLiquidityOutsideX128, uint32 secondsOutside, bool initialized)',
    // 'function token0() view returns (address)',
    // 'function token1() view returns (address)',
];

export const UNISWAP_QUOTER_CONTRACT_ABI = [
    // 'constructor(address _factory, address _WETH9) nonpayable',
    // 'function WETH9() view returns (address)',
    // 'function factory() view returns (address)',
    // 'function quoteExactInput(bytes path, uint256 amountIn) returns (uint256 amountOut)',
    'function quoteExactInputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountIn, uint160 sqrtPriceLimitX96) returns (uint256 amountOut)',
    // 'function quoteExactOutput(bytes path, uint256 amountOut) returns (uint256 amountIn)',
    // 'function quoteExactOutputSingle(address tokenIn, address tokenOut, uint24 fee, uint256 amountOut, uint160 sqrtPriceLimitX96) returns (uint256 amountIn)',
    // 'function uniswapV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes path) view'
];

export const USDC_HTLC_CONTRACT_ABI = [
    // 'constructor()',
    // 'event DomainRegistered(bytes32 indexed domainSeparator, bytes domainValue)',
    'event Open(bytes32 indexed id, address token, uint256 amount, address recipient, bytes32 hash, uint256 timeout)',
    // 'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
    'event Redeem(bytes32 indexed id, bytes32 secret)',
    'event Refund(bytes32 indexed id)',
    // 'event RequestTypeRegistered(bytes32 indexed typeHash, string typeStr)',
    // 'function EIP712_DOMAIN_TYPE() view returns (string)',
    // 'function deposits(address) view returns (uint256)',
    // 'function domains(bytes32) view returns (bool)',
    // 'function execute(tuple(address from, address to, uint256 value, uint256 gas, uint256 nonce, bytes data, uint256 validUntil) request, bytes32 domainSeparator, bytes32 requestTypeHash, bytes suffixData, bytes signature) payable returns (bool success, bytes ret)',
    'function getGasAndDataLimits() view returns (tuple(uint256 acceptanceBudget, uint256 preRelayedCallGasLimit, uint256 postRelayedCallGasLimit, uint256 calldataSizeLimit) limits)',
    // 'function getHubAddr() view returns (address)',
    // 'function getMinimumRelayFee(tuple(uint256 gasPrice, uint256 pctRelayFee, uint256 baseRelayFee, address relayWorker, address paymaster, address forwarder, bytes paymasterData, uint256 clientId) relayData) view returns (uint256 amount)',
    'function getNonce(address from) view returns (uint256)',
    // 'function getRelayHubDeposit() view returns (uint256)',
    // 'function getRequiredRelayFee(tuple(uint256 gasPrice, uint256 pctRelayFee, uint256 baseRelayFee, address relayWorker, address paymaster, address forwarder, bytes paymasterData, uint256 clientId) relayData, bytes4 methodId) view returns (uint256 amount)',
    'function getRequiredRelayGas(bytes4 methodId) view returns (uint256 gas)',
    // 'function htlcs(bytes32) view returns (address token, uint256 amount, address refund, address recipient, bytes32 hash, uint256 timeout)',
    // 'function isTrustedForwarder(address forwarder) view returns (bool)',
    // 'function open(bytes32 id, address token, uint256 amount, address refundAddress, address recipientAddress, bytes32 hash, uint256 timeout, uint256 fee)',
    'function openWithApproval(bytes32 id, address token, uint256 amount, address refundAddress, address recipientAddress, bytes32 hash, uint256 timeout, uint256 fee, uint256 approval, bytes32 sigR, bytes32 sigS, uint8 sigV)',
    // 'function owner() view returns (address)',
    // 'function postRelayedCall(bytes context, bool success, uint256 gasUseWithoutPost, tuple(uint256 gasPrice, uint256 pctRelayFee, uint256 baseRelayFee, address relayWorker, address paymaster, address forwarder, bytes paymasterData, uint256 clientId) relayData)',
    // 'function preRelayedCall(tuple(tuple(address from, address to, uint256 value, uint256 gas, uint256 nonce, bytes data, uint256 validUntil) request, tuple(uint256 gasPrice, uint256 pctRelayFee, uint256 baseRelayFee, address relayWorker, address paymaster, address forwarder, bytes paymasterData, uint256 clientId) relayData) relayRequest, bytes signature, bytes approvalData, uint256 maxPossibleGas) returns (bytes context, bool revertOnRecipientRevert)',
    // 'function redeem(bytes32 id, address target, bytes32 secret, uint256 fee)',
    'function redeemWithSecretInData(bytes32 id, address target, uint256 fee)',
    'function refund(bytes32 id, address target, uint256 fee)',
    // 'function registerDomainSeparator(string name, string version)',
    // 'function registerRequestType(string typeName, string typeSuffix)',
    // 'function registerToken(address token, address pool)',
    // 'function registeredTokenPool(address) view returns (address)',
    // 'function registeredTokenPoolFee(address token) view returns (uint24 fee)',
    // 'function relayWithoutGsn(tuple(tuple(address from, address to, uint256 value, uint256 gas, uint256 nonce, bytes data, uint256 validUntil) request, tuple(uint256 gasPrice, uint256 pctRelayFee, uint256 baseRelayFee, address relayWorker, address paymaster, address forwarder, bytes paymasterData, uint256 clientId) relayData) relayRequest, bytes signature, bytes approvalData, address relay)',
    // 'function renounceOwnership()',
    // 'function requiredRelayGas() view returns (uint256)',
    // 'function setGasAndDataLimits(tuple(uint256 acceptanceBudget, uint256 preRelayedCallGasLimit, uint256 postRelayedCallGasLimit, uint256 calldataSizeLimit) limits)',
    // 'function setMaxRequiredRelayGas(uint256 gas)',
    // 'function setRelayHub(address hub)',
    // 'function setRequiredRelayGas(bytes4 methodId, uint256 gas)',
    // 'function setWrappedChainToken(address _wrappedChainToken)',
    // 'function transferOwnership(address newOwner)',
    // 'function trustedForwarder() view returns (address forwarder)',
    // 'function typeHashes(bytes32) view returns (bool)',
    // 'function uniswapV3SwapCallback(int256 amount0Delta, int256 amount1Delta, bytes _data)',
    // 'function unregisterToken(address token)',
    // 'function verify(tuple(address from, address to, uint256 value, uint256 gas, uint256 nonce, bytes data, uint256 validUntil) forwardRequest, bytes32 domainSeparator, bytes32 requestTypeHash, bytes suffixData, bytes signature) view',
    // 'function versionPaymaster() view returns (string)',
    // 'function versionRecipient() view returns (string)',
    // 'function withdraw(uint256 amount, address target)',
    // 'function withdrawRelayHubDeposit(uint256 amount, address target)',
    // 'function withdrawToken(address token, uint256 amount, address target)',
    // 'function wrappedChainToken() view returns (address)',
];
