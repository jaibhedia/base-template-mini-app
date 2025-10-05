# Base Ninja Score NFT - Smart Contract Deployment Guide

## 🚀 Quick Deploy (Using Remix - Recommended for Beginners)

### Step 1: Prepare Your Wallet
1. Install MetaMask: https://metamask.io/
2. Add Base Network to MetaMask:
   - Network Name: Base Mainnet
   - RPC URL: https://mainnet.base.org
   - Chain ID: 8453
   - Currency Symbol: ETH
   - Block Explorer: https://basescan.org

3. Get some ETH on Base:
   - Bridge from Ethereum: https://bridge.base.org/
   - Or buy directly on Base

### Step 2: Deploy with Remix
1. Go to https://remix.ethereum.org/
2. Create new file: `BaseNinjaScore.sol`
3. Copy the entire contract from `contracts/BaseNinjaScore.sol`
4. Compile:
   - Click "Solidity Compiler" tab
   - Select compiler version: `0.8.20` or higher
   - Click "Compile BaseNinjaScore.sol"
5. Deploy:
   - Click "Deploy & Run Transactions" tab
   - Environment: Select "Injected Provider - MetaMask"
   - Make sure MetaMask is connected to Base network
   - Click "Deploy"
   - Confirm transaction in MetaMask
6. **SAVE THE CONTRACT ADDRESS** that appears after deployment!

### Step 3: Update Your App
1. Copy the deployed contract address
2. Open `src/lib/contract.ts`
3. Replace the address:
```typescript
export const BASE_NINJA_SCORE_ADDRESS = '0xYOUR_DEPLOYED_ADDRESS_HERE';
```

### Step 4: Verify Contract (Optional but Recommended)
1. Go to https://basescan.org/
2. Search for your contract address
3. Click "Contract" tab → "Verify and Publish"
4. Fill in:
   - Compiler Type: Solidity (Single file)
   - Compiler Version: v0.8.20
   - License Type: MIT
   - Paste your contract code
5. Submit

---

## 🛠️ Advanced Deploy (Using Hardhat)

### Prerequisites
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox @openzeppelin/contracts dotenv
```

### Step 1: Setup Environment
1. Copy `.env.contract.example` to `.env.local`:
```bash
cp .env.contract.example .env.local
```

2. Edit `.env.local` and add:
```env
PRIVATE_KEY=your_wallet_private_key_without_0x_prefix
BASESCAN_API_KEY=your_basescan_api_key_from_basescan.org
```

⚠️ **NEVER commit `.env.local` to git!**

### Step 2: Deploy to Base Sepolia (Testnet)
```bash
npx hardhat run scripts/contract/deploy.ts --network baseSepolia
```

### Step 3: Deploy to Base Mainnet
```bash
npx hardhat run scripts/contract/deploy.ts --network base
```

### Step 4: Verify Contract
```bash
npx hardhat verify --network base YOUR_CONTRACT_ADDRESS
```

---

## 📝 Contract Functions

### For Players (Free to call)
- `mintScore(score, combo, level)` - Mint your game score as NFT (costs gas)
- `getPlayerTokens(address)` - Get all NFTs owned by a player
- `getGameScore(tokenId)` - Get score details for an NFT
- `getHighestScore(address)` - Get player's highest score

### NFT Features
- ✅ On-chain metadata (no IPFS needed)
- ✅ Dynamic SVG image generated on-chain
- ✅ Shows score, combo, level, and timestamp
- ✅ Fully decentralized
- ✅ Works with OpenSea, Rarible, etc.

---

## 💰 Cost Estimate

### Base Mainnet
- Deploy: ~$2-5 (one-time)
- Mint NFT: ~$0.10-0.50 per mint

### Base Sepolia (Testnet)
- Deploy: FREE (test ETH)
- Mint NFT: FREE (test ETH)

Get Base Sepolia test ETH: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

---

## 🔍 After Deployment

1. **Test Minting**:
   - Play the Base Ninja game
   - Score some points
   - Click "Mint NFT" on results screen
   - Confirm transaction in MetaMask

2. **View Your NFT**:
   - Go to https://opensea.io/
   - Connect your wallet
   - Find your Base Ninja Score NFT!

3. **Share**:
   - Each NFT has a unique on-chain image
   - Share on social media
   - Trade on OpenSea

---

## 🆘 Troubleshooting

### "Insufficient funds"
- Make sure you have ETH on Base network
- Bridge from Ethereum: https://bridge.base.org/

### "Contract not verified"
- Follow verification steps on BaseScan
- Or use Hardhat verify command

### "Transaction failed"
- Check gas prices
- Make sure you're on the correct network
- Try increasing gas limit

---

## 📚 Resources

- Base Documentation: https://docs.base.org/
- Hardhat Docs: https://hardhat.org/
- OpenZeppelin: https://docs.openzeppelin.com/
- BaseScan: https://basescan.org/

---

## 🎮 Ready to Deploy?

Choose your method:
1. **Easy**: Use Remix (Steps above)
2. **Advanced**: Use Hardhat (Steps above)

After deployment, update `src/lib/contract.ts` with your contract address and start minting! 🚀
