const main = async () => {
  const domainContractFactory = await hre.ethers.getContractFactory('Domains');
  const domainContract = await domainContractFactory.deploy("cat_ninja");
  await domainContract.waitForDeployment();

  console.log("Contract deployed to:", domainContract.target);

  // CHANGE THIS DOMAIN TO SOMETHING ELSE! I don't want to see OpenSea full of bananas lol
  let txn = await domainContract.register("cat",  {value: hre.ethers.parseEther('0.1')});
  await txn.wait();
  console.log("Minted domain cat.ninja");

  txn = await domainContract.setRecord("cat", "Am I a cat or a ninja??");
  await txn.wait();
  console.log("Set record for cat.ninja");

  const address = await domainContract.getAddress("cat");
  console.log("Owner of domain car:", address);

  // const balance = await hre.ethers.provider.getBalance(domainContract.target);
  // console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
}

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();