import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Deploying Base Ninja Score NFT Contract...\n");

  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("📝 Deploying with account:", deployer.address);
  
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", ethers.formatEther(balance), "ETH\n");

  // Deploy the contract
  console.log("⏳ Deploying contract...");
  const BaseNinjaScore = await ethers.getContractFactory("BaseNinjaScore");
  const contract = await BaseNinjaScore.deploy();
  
  await contract.waitForDeployment();
  const contractAddress = await contract.getAddress();

  console.log("\n✅ Contract deployed successfully!");
  console.log("📍 Contract address:", contractAddress);
  console.log("🔗 View on BaseScan:", `https://basescan.org/address/${contractAddress}`);
  
  // Wait for a few block confirmations before verifying
  console.log("\n⏳ Waiting for block confirmations...");
  await contract.deploymentTransaction()?.wait(5);
  
  console.log("\n📋 Next steps:");
  console.log("1. Update src/lib/contract.ts with this address:");
  console.log(`   export const BASE_NINJA_SCORE_ADDRESS = '${contractAddress}';`);
  console.log("\n2. Verify the contract on BaseScan:");
  console.log(`   npx hardhat verify --network base ${contractAddress}`);
  console.log("\n3. Test minting:");
  console.log("   Play the game and mint your score NFT!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment failed:", error);
    process.exit(1);
  });
