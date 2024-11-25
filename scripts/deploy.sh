#!/bin/bash

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Function to display usage message
show_usage() {
    local error_msg="$1"

    if [ -n "$error_msg" ]; then
        echo -e "${RED}Error: $error_msg${NC}"
        echo
    fi

    echo -e "${BLUE}Usage: $0 <version_number> -m <commit_message> --deployer=NAME [--exclude-release] [--no-translations] [--mainnet] [--deploy-only]${NC}"
    echo
    echo -e "${CYAN}Examples:${NC}"
    echo "1. Simple message (testnet):"
    echo -e "   ${GREEN}$0 3.0.10 -m 'Fix network stall handling' --deployer=matheo${NC}"
    echo
    echo "2. Multi-line message (mainnet):"
    echo -e "   ${GREEN}$0 3.0.4 -m '- Move network browsers-not-shown warning to not overlap with bottom row"
    echo "- Add a \"Failed to fetch transactions\" notice when transaction fetching fails"
    echo "- Add a retry-mechanism to all Nimiq network requests"
    echo "- Also hide staked amounts when privacy mode is on"
    echo -e "- Enforce minimum stake on the slider itself' --deployer=john --mainnet${NC}"
    echo
    echo "3. Deploy only (after a cancelled deployment):"
    echo -e "   ${GREEN}$0 --deploy-only${NC}"
    exit 1
}

# Check if version number is provided
if [ "$#" -lt 1 ]; then
    show_usage
fi

# Don't require version number if --deploy-only is specified
if [[ "$1" == "--deploy-only" ]]; then
    VERSION=""
    DEPLOY_ONLY=true
    shift
else
    VERSION="$1"
    shift # Remove version from arguments
fi

# Default values
DEPLOYER=""
EXCLUDE_RELEASE=""
SYNC_TRANSLATIONS=true
BUILD_ENV="testnet"
DEPLOY_ONLY=false

# Parse remaining arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --deployer=*)
            DEPLOYER="${1#*=}"
            if [ $# -eq 0 ]; then
                echo -e "${RED}Error: --deployer requires a deployer name${NC}"
                exit 1
            fi
            shift
            ;;
        --exclude-release)
            EXCLUDE_RELEASE="[exclude-release]"
            shift
            ;;
        --no-translations)
            SYNC_TRANSLATIONS=false
            shift
            ;;
        --mainnet)
            BUILD_ENV="mainnet"
            shift
            ;;
        --deploy-only)
            DEPLOY_ONLY=true
            shift
            ;;
        -m)
            shift
            if [ $# -eq 0 ]; then
                echo -e "${RED}Error: -m requires a commit message${NC}"
                exit 1
            fi
            COMMIT_MSG="$1"
            shift
            ;;
        *)
            echo -e "${RED}Error: Unknown parameter $1${NC}"
            exit 1
            ;;
    esac
done

# Parameter validation
if [ "$DEPLOY_ONLY" = false ]; then
    if [ -z "$DEPLOYER" ]; then
        show_usage "--deployer parameter is required"
    fi
    if [ -z "$COMMIT_MSG" ]; then
        show_usage "commit message (-m) is required"
    fi
fi

# Validate version number format
if ! [[ $VERSION =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] && [ "$DEPLOY_ONLY" = false ]; then
    show_usage "Version number must be in format X.Y.Z"
fi

# Function to compare version numbers
version_gt() {
    test "$(printf '%s\n' "$@" | sort -V | head -n 1)" != "$1"
}

# Function to handle SSH deployment
do_ssh_deployment() {
    # Confirmation prompt before deployment
    echo -e "${YELLOW}${1:-The new version is ready. Do you want to proceed with the deployment? [y/N] }${NC}"
    read -n 1 -r
    echo    # Move to a new line
    if [[ ! $REPLY =~ ^[Yy]$ ]]
    then
        echo -e "${RED}Deployment cancelled.${NC}"
        exit 1
    fi

    # SSH into deployment servers
    echo -e "${BLUE}Connecting to deployment servers...${NC}"
    for server in "${DEPLOY_SERVERS[@]}"; do
        echo -e "${CYAN}Connecting to $server...${NC}"
        ssh "$server"
    done

    echo -e "${GREEN}Deployment complete!${NC}"
}

# If deploy-only flag is set, skip to deployment
if [ "$DEPLOY_ONLY" = true ]; then
    echo "Running deployment only..."
    do_ssh_deployment "Are you sure you want to proceed with the deployment? [y/N] "
    exit 0
fi

# Check if new version is greater than all existing tags in current repo
echo -e "${BLUE}Checking version against existing tags in wallet repo...${NC}"
EXISTING_TAGS=$(git tag | grep "^v[0-9]" | sed 's/^v//')
for tag in $EXISTING_TAGS; do
    if ! version_gt "$VERSION" "$tag"; then
        echo -e "${RED}Error: Version $VERSION is not greater than existing version $tag${NC}"
        exit 1
    fi
done

# Configuration
DEPLOYMENT_REPO="deployment-wallet"
DEPLOY_SERVERS=("deploy_wallet@web-1" "deploy_wallet@web-2" "deploy_wallet@web-3" "deploy_wallet@web-4")

# Set environment tag based on BUILD_ENV
ENV_TAG=$([ "$BUILD_ENV" = "mainnet" ] && echo "main" || echo "test")

# Pre-deployment tasks
echo -e "${BLUE}Running pre-deployment tasks...${NC}"

if [ "$SYNC_TRANSLATIONS" = "true" ]; then
    echo -e "${CYAN}Syncing translations...${NC}"
    yarn i18n:sync
fi

# Get up-to-date EBA RT1 bank list (disabled while OASIS is not available)
# yarn utils:getBankList

# Get up-to-date browsers support list from caniuse.
# The browserslist utility is meant to run via npx, even when usually using yarn, and is compatible with yarn.lock.
echo "Updating browsers support list..."
npx browserslist@latest --update-db

# Build Nginx path allowlist
echo "Building Nginx path allowlist..."
yarn utils:makeNginxAllowlist

# Check for uncommitted changes
if [[ `git status --porcelain` ]]; then
    echo -e "${RED}ERROR: The repository has uncommitted changes. Commit them first, then run again.${NC}"
    exit 1
fi

# Function to create commit/tag message
create_message() {
    echo "Nimiq Wallet v$VERSION

$COMMIT_MSG

$EXCLUDE_RELEASE"
}

# Create and push source tag
echo -e "${BLUE}Creating source tag v$VERSION...${NC}"
git tag -a -s "v$VERSION" -m "$(create_message)"

# Build the project
echo -e "${BLUE}Building project with $BUILD_ENV configuration...${NC}"
env "build=$BUILD_ENV" yarn build

# Push changes and tags
echo -e "${BLUE}Pushing source changes and tags...${NC}"
git push && git push --tags

# Deploy to deployment repository
echo -e "${BLUE}Deploying to $DEPLOYMENT_REPO...${NC}"
cd "$DEPLOYMENT_REPO" || exit 1

# Checkout appropriate branch and pull latest changes
DEPLOY_BRANCH=$([ "$BUILD_ENV" = "mainnet" ] && echo "mainnet" || echo "testnet")
echo -e "${CYAN}Checking out $DEPLOY_BRANCH branch...${NC}"
git checkout "$DEPLOY_BRANCH"
git pull

# Check if new version is greater than all existing tags in deployment repo for the current branch
echo -e "${BLUE}Checking version against existing tags in deployment repo ($DEPLOY_BRANCH branch)...${NC}"
EXISTING_DEPLOY_TAGS=$(git tag | grep "^v[0-9].*-$ENV_TAG-" | sed 's/^v\([0-9][^-]*\).*/\1/')
for tag in $EXISTING_DEPLOY_TAGS; do
    if ! version_gt "$VERSION" "$tag"; then
        echo -e "${RED}Error: Version $VERSION is not greater than existing version $tag in deployment repo${NC}"
        exit 1
    fi
done

# Copy build files
echo -e "${CYAN}Copying build files...${NC}"
cp -r ../dist/. dist
git add dist

# Commit changes
echo -e "${CYAN}Committing changes...${NC}"
git commit -m "$(create_message)"

# Create deployment tag
echo -e "${BLUE}Creating deployment tag...${NC}"
git tag -a -s "v$VERSION-$ENV_TAG-$DEPLOYER" -m "$(create_message)"

# Push deployment changes and tags
echo -e "${BLUE}Pushing deployment changes and tags...${NC}"
git push && git push --tags

# Run the deployment
do_ssh_deployment
