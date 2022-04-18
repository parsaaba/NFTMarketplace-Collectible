module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  try {
    // deploy Payment Token
    const paymentToken = await deploy("PaymentToken", {
      from: deployer,
      // gas: 4000000,
      args: ["Payment Token", "PMT", 18],
    });

    console.log(`Payment Token Address: ${paymentToken.address}`);

    // deploy NFT Token
    const nftToken = await deploy("NFTToken", {
      from: deployer,
      // gas: 4000000,
      args: ["My Collectible Token", "MCT"],
    });
    console.log(`NFT Token Address: ${nftToken.address}`);

    // deploy NFT Marketplace
    const nftMarketplace = await deploy("NFTMarketplace", {
      from: deployer,
      // gas: 4000000,
      args: [paymentToken.address, deployer],
    });
    console.log(`NFT Marketplace Address: ${nftMarketplace.address}`);
  } catch (error) {
    console.error(error);
  }
};
