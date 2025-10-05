#!/bin/bash

# Base Ninja Score NFT - Quick Deployment Script
# This script will guide you through deploying the smart contract

set -e

echo "🥷 Base Ninja Score NFT Deployment Script"
echo "=========================================="
echo ""

# Check if hardhat is installed
if ! npm list hardhat &> /dev/null; then
    echo "📦 Installing Hardhat and dependencies..."
    npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts dotenv ethers
    echo "✅ Dependencies installed!"
    echo ""
fi

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local not found!"
    echo "Creating from example..."
    cp .env.contract.example .env.local
    echo ""
    echo "📝 Please edit .env.local and add:"
    echo "   1. Your wallet PRIVATE_KEY"
    echo "   2. Your BASESCAN_API_KEY (get from https://basescan.org/)"
    echo ""
    echo "After updating .env.local, run this script again."
    exit 1
fi

# Source the .env file
source .env.local

# Check if private key is set
if [ -z "$PRIVATE_KEY" ] || [ "$PRIVATE_KEY" = "your_private_key_here" ]; then
    echo "❌ PRIVATE_KEY not set in .env.local"
    echo "Please add your wallet private key to .env.local"
    exit 1
fi

echo "Choose deployment network:"
echo "1) Base Sepolia (Testnet - FREE)"
echo "2) Base Mainnet (Costs real ETH)"
echo ""
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        NETWORK="baseSepolia"
        EXPLORER="https://sepolia.basescan.org"
        echo "🧪 Deploying to Base Sepolia Testnet..."
        ;;
    2)
        NETWORK="base"
        EXPLORER="https://basescan.org"
        echo "🚀 Deploying to Base Mainnet..."
        read -p "⚠️  This will cost real ETH. Continue? (yes/no): " confirm
        if [ "$confirm" != "yes" ]; then
            echo "Deployment cancelled."
            exit 0
        fi
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "📝 Compiling contract..."
npx hardhat compile

echo ""
echo "🚀 Deploying contract to $NETWORK..."
DEPLOY_OUTPUT=$(npx hardhat run scripts/contract/deploy.ts --network $NETWORK 2>&1)
echo "$DEPLOY_OUTPUT"

# Extract contract address from output
CONTRACT_ADDRESS=$(echo "$DEPLOY_OUTPUT" | grep -o '0x[a-fA-F0-9]\{40\}' | head -1)

if [ -z "$CONTRACT_ADDRESS" ]; then
    echo "❌ Failed to extract contract address"
    exit 1
fi

echo ""
echo "✅ Deployment successful!"
echo "📍 Contract Address: $CONTRACT_ADDRESS"
echo "🔗 View on Explorer: $EXPLORER/address/$CONTRACT_ADDRESS"
echo ""

# Update contract.ts
echo "📝 Updating src/lib/contract.ts..."
sed -i.bak "s/0x0000000000000000000000000000000000000000/$CONTRACT_ADDRESS/" src/lib/contract.ts
rm src/lib/contract.ts.bak

echo "✅ Contract address updated in code!"
echo ""

# Verify contract
if [ -n "$BASESCAN_API_KEY" ] && [ "$BASESCAN_API_KEY" != "your_basescan_api_key_here" ]; then
    echo "🔍 Verifying contract on BaseScan..."
    sleep 10 # Wait for block confirmations
    npx hardhat verify --network $NETWORK $CONTRACT_ADDRESS || echo "⚠️  Verification failed, but you can verify manually later"
else
    echo "⚠️  BASESCAN_API_KEY not set. Skipping verification."
    echo "You can verify manually at: $EXPLORER/verifyContract"
fi

echo ""
echo "🎉 Deployment Complete!"
echo ""
echo "Next steps:"
echo "1. ✅ Contract is deployed and address is updated"
echo "2. 🎮 Play the game and test minting NFTs"
echo "3. 🖼️  View your NFTs on OpenSea"
echo "4. 📱 Share your high scores!"
echo ""
