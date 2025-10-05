# 🚀 Deploy Your Base Ninja Score NFT Contract

This guide will walk you through deploying the smart contract that mints game scores as NFTs on Base blockchain.

## 🎯 Easiest Method: Using Remix IDE (Recommended)

### Step 1: Prepare MetaMask

1. **Install MetaMask**: https://metamask.io/
2. **Add Base Network**:
   - Open MetaMask → Networks → Add Network
   - **Network Name**: Base Mainnet
   - **RPC URL**: https://mainnet.base.org
   - **Chain ID**: 8453
   - **Currency Symbol**: ETH
   - **Block Explorer**: https://basescan.org

3. **Get ETH on Base**:
   - Bridge from Ethereum: https://bridge.base.org/
   - Or buy directly through Coinbase

### Step 2: Deploy with Remix

1. **Open Remix**: Go to https://remix.ethereum.org/

2. **Create Contract File**:
   - Click "File Explorer" (📁 icon)
   - Click "Create New File" button
   - Name it: `BaseNinjaScore.sol`

3. **Copy Contract Code**:
   - Open `contracts/BaseNinjaScore.sol` from this project
   - Copy ALL the code
   - Paste it into Remix

4. **Compile**:
   - Click "Solidity Compiler" tab (📝 icon)
   - Select Compiler: **0.8.20** or higher
   - Click **"Compile BaseNinjaScore.sol"**
   - Wait for green checkmark ✅

5. **Deploy**:
   - Click "Deploy & Run Transactions" tab (🚀 icon)
   - **Environment**: Select **"Injected Provider - MetaMask"**
   - MetaMask will pop up - click "Connect"
   - Make sure MetaMask shows **"Base Mainnet"** network
   - Click **"Deploy"** button (orange)
   - **Confirm** transaction in MetaMask
   - Wait 10-30 seconds...

6. **Copy Contract Address**:
   - After deployment, look in "Deployed Contracts" section
   - Click the copy icon 📋 next to your contract
   - **SAVE THIS ADDRESS!** You'll need it in Step 3

### Step 3: Update Your App

1. **Open Project File**:
   ```bash
   open src/lib/contract.ts
   ```

2. **Find This Line** (line 769):
   ```typescript
   export const BASE_NINJA_SCORE_ADDRESS = "0x0000000000000000000000000000000000000000";
   ```

3. **Replace with Your Address**:
   ```typescript
   export const BASE_NINJA_SCORE_ADDRESS = "0xYOUR_CONTRACT_ADDRESS_HERE";
   ```

4. **Save the File**

### Step 4: Test It!

1. Run your app:
   ```bash
   npm run dev
   ```

2. Play the game and score some points

3. Click "Mint NFT" button on results screen

4. Confirm transaction in MetaMask

5. **View Your NFT**:
   - Go to https://opensea.io/
   - Connect your wallet
   - Find your Base Ninja Score NFT!

---

## ⚙️ Advanced Method: Using Hardhat

### Prerequisites

```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts dotenv
```

### Setup

1. **Create `.env.local`**:
   ```bash
   cp .env.contract.example .env.local
   ```

2. **Edit `.env.local`**:
   ```env
   PRIVATE_KEY=your_wallet_private_key_here
   BASESCAN_API_KEY=your_basescan_api_key_here
   ```

   **Get your Private Key**:
   - MetaMask → Account → ⋮ Menu → Account Details → Export Private Key
   - ⚠️ **NEVER share this or commit it to git!**

   **Get BaseScan API Key**:
   - Go to https://basescan.org/
   - Sign up / Log in
   - My Profile → API Keys → Add → Copy key

### Deploy

**To Base Sepolia (Testnet - FREE)**:
```bash
npx hardhat run scripts/contract/deploy.ts --network baseSepolia
```

**To Base Mainnet (Costs real ETH)**:
```bash
npx hardhat run scripts/contract/deploy.ts --network base
```

### Verify Contract

```bash
npx hardhat verify --network base YOUR_CONTRACT_ADDRESS
```

---

## 💰 Cost Estimate

### Base Mainnet
- **Deploy Contract**: $2-5 (one-time cost)
- **Mint Each NFT**: $0.10-0.50 per mint

### Base Sepolia Testnet
- **Everything FREE** with test ETH
- Get test ETH: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

---

## ✅ Verify Your Contract (Optional but Recommended)

### Why Verify?
- Makes your contract readable on BaseScan
- Builds trust with users
- Allows direct interaction through BaseScan UI

### How to Verify

**Method 1: Using BaseScan**
1. Go to https://basescan.org/verifyContract
2. Enter your contract address
3. Select:
   - Compiler Type: **Solidity (Single file)**
   - Compiler Version: **v0.8.20**
   - License: **MIT**
4. Paste your contract code from `contracts/BaseNinjaScore.sol`
5. Click "Verify and Publish"

**Method 2: Using Hardhat**
```bash
npx hardhat verify --network base YOUR_CONTRACT_ADDRESS
```

---

## 🧪 Testing Before Mainnet

**Test on Base Sepolia first!**

1. Change MetaMask to **Base Sepolia**:
   - Network Name: Base Sepolia
   - RPC URL: https://sepolia.base.org
   - Chain ID: 84532
   - Currency Symbol: ETH
   - Block Explorer: https://sepolia.basescan.org

2. Get free test ETH: https://www.coinbase.com/faucets

3. Deploy to Sepolia using Remix or Hardhat

4. Test minting NFTs

5. Once everything works, deploy to mainnet!

---

## 📱 After Deployment

### View Your NFTs

1. **OpenSea**: https://opensea.io/
   - Connect wallet
   - Click your profile
   - See all your Base Ninja Score NFTs!

2. **BaseScan**: https://basescan.org/address/YOUR_ADDRESS
   - View all your tokens
   - See transaction history

### Share Your Score NFTs

Each NFT includes:
- ✅ Your final score
- ✅ Highest combo achieved
- ✅ Level reached
- ✅ Timestamp of game
- ✅ Dynamic on-chain SVG image

---

## 🆘 Troubleshooting

### "Insufficient funds for gas"
- **Solution**: Add more ETH to your wallet
- Bridge: https://bridge.base.org/

### "Transaction failed"
- **Check**: Are you on the right network? (Base Mainnet)
- **Try**: Increasing gas limit in MetaMask

### "Contract not found"
- **Wait**: Transactions can take 10-30 seconds
- **Refresh**: BaseScan page after 1 minute

### "NFT not showing on OpenSea"
- **Wait**: OpenSea can take 5-30 minutes to index
- **Refresh Metadata**: Click ⋯ → Refresh metadata on OpenSea

### "Error: nonce too low"
- **Solution**: Reset MetaMask: Settings → Advanced → Clear activity tab data

---

## 📚 Contract Functions Reference

### Player Functions (Anyone can call)

```solidity
// Mint your score as an NFT (costs gas)
function mintScore(uint256 score, uint256 combo, uint256 level) 
    returns (uint256 tokenId)

// Get all NFT IDs you own
function getPlayerTokens(address player) 
    returns (uint256[] tokenIds)

// Get score details for an NFT
function getGameScore(uint256 tokenId) 
    returns (GameScore)

// Get your highest score
function getHighestScore(address player) 
    returns (uint256)
```

### NFT Features

- ✅ **ERC-721 Standard** - Works with all NFT marketplaces
- ✅ **On-Chain Metadata** - No IPFS, fully decentralized
- ✅ **Dynamic SVG** - Image generated on-chain
- ✅ **Immutable** - Scores can never be changed
- ✅ **Tradeable** - Buy, sell, or trade your high scores!

---

## 🎮 Ready to Deploy?

**Quick Checklist**:
1. ☐ MetaMask installed with Base network added
2. ☐ ETH in wallet (on Base)
3. ☐ Contract code copied to Remix
4. ☐ Contract deployed
5. ☐ Contract address saved
6. ☐ Address updated in `src/lib/contract.ts`
7. ☐ App tested - NFT minted successfully!

---

## 🎉 Congratulations!

Your Base Ninja game now immortalizes high scores as NFTs on the blockchain! 

Players can:
- 🎮 Play and score points
- 🖼️ Mint their scores as NFTs
- 💎 Own their achievements forever
- 📈 Trade high score NFTs
- 🏆 Prove they're the best ninja!

---

## 📞 Need Help?

- Base Discord: https://discord.gg/buildonbase
- Hardhat Docs: https://hardhat.org/
- OpenZeppelin: https://docs.openzeppelin.com/
- BaseScan: https://basescan.org/

Happy minting! 🥷⚡
