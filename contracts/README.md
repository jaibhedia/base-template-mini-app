# Base Ninja Score NFT Contract

This smart contract allows players to mint their game scores as NFTs on the Base blockchain.

## Contract Features

- **ERC-721 NFT**: Each game score is minted as a unique NFT
- **On-Chain Metadata**: Score, combo, level, and timestamp stored on-chain
- **Dynamic SVG**: NFT image is generated on-chain with game stats
- **Player History**: Track all scores and highest score per player
- **Base Chain**: Deployed on Base (Layer 2 Ethereum)

## Contract Structure

```solidity
struct GameScore {
    uint256 score;      // Final game score
    uint256 combo;      // Highest combo achieved
    uint256 level;      // Level reached
    uint256 timestamp;  // When the score was minted
    address player;     // Player's wallet address
}
```

## Deployment Instructions

### Prerequisites

1. Install Foundry (for Solidity development):
```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

2. Or use Remix IDE: https://remix.ethereum.org/

### Deploy with Remix (Easiest)

1. Go to https://remix.ethereum.org/
2. Create a new file `BaseNinjaScore.sol`
3. Copy the contract code from `contracts/BaseNinjaScore.sol`
4. Install OpenZeppelin (in Remix):
   - Go to Plugin Manager
   - Install "OpenZeppelin" plugin
5. Compile the contract (Solidity 0.8.20+)
6. Deploy:
   - Select "Injected Provider - MetaMask"
   - Connect to Base Sepolia or Base Mainnet
   - Click "Deploy"
7. Copy the deployed contract address

### Deploy with Foundry

1. Initialize Foundry project:
```bash
forge init base-ninja-nft
cd base-ninja-nft
```

2. Install OpenZeppelin:
```bash
forge install OpenZeppelin/openzeppelin-contracts
```

3. Copy contract to `src/BaseNinjaScore.sol`

4. Create `.env` file:
```env
PRIVATE_KEY=your_private_key_here
BASE_SEPOLIA_RPC=https://sepolia.base.org
BASE_MAINNET_RPC=https://mainnet.base.org
BASESCAN_API_KEY=your_basescan_api_key
```

5. Deploy to Base Sepolia (testnet):
```bash
forge create --rpc-url $BASE_SEPOLIA_RPC \
  --private-key $PRIVATE_KEY \
  --etherscan-api-key $BASESCAN_API_KEY \
  --verify \
  src/BaseNinjaScore.sol:BaseNinjaScore
```

6. Deploy to Base Mainnet:
```bash
forge create --rpc-url $BASE_MAINNET_RPC \
  --private-key $PRIVATE_KEY \
  --etherscan-api-key $BASESCAN_API_KEY \
  --verify \
  src/BaseNinjaScore.sol:BaseNinjaScore
```

### After Deployment

1. Copy the deployed contract address
2. Update `src/lib/contract.ts`:
```typescript
export const BASE_NINJA_SCORE_ADDRESS = "0xYourDeployedContractAddress";
```

## Network Information

### Base Sepolia (Testnet)
- RPC URL: https://sepolia.base.org
- Chain ID: 84532
- Block Explorer: https://sepolia.basescan.org
- Faucet: https://www.coinbase.com/faucets/base-ethereum-goerli-faucet

### Base Mainnet
- RPC URL: https://mainnet.base.org
- Chain ID: 8453
- Block Explorer: https://basescan.org

## Testing the Contract

You can test minting on Base Sepolia testnet first:

1. Get testnet ETH from the Base faucet
2. Connect your wallet to Base Sepolia
3. Play the game and complete a round
4. Click "Mint Score NFT" on the results screen
5. Confirm the transaction in your wallet
6. View your NFT on https://sepolia.basescan.org

## NFT Metadata

Each NFT includes:
- **Score**: Your final game score
- **Max Combo**: Highest combo achieved
- **Level**: Level reached in the game
- **Timestamp**: When the score was recorded
- **Dynamic SVG**: On-chain generated image with Base branding

## Gas Optimization

The contract uses:
- Efficient storage patterns
- On-chain SVG generation (no IPFS needed)
- Base64 encoding for metadata
- Minimal external calls

Estimated gas cost per mint: ~200,000-300,000 gas

## Security Features

- OpenZeppelin audited contracts (ERC721, Ownable)
- No admin functions to modify scores
- Immutable score records
- Player ownership verification

## Support

For issues or questions about the contract:
- Check Base documentation: https://docs.base.org
- OpenZeppelin docs: https://docs.openzeppelin.com
- Base Discord: https://base.org/discord
