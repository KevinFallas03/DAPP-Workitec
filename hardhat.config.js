require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.3",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }, 
    ropsten: {
      url: "https://ropsten.infura.io/v3/74722d87dd9e4465a8bd00dedcf01000", 
      accounts: [`0x${"7c2f5a00b3cf0447c7f940a6688a04b997f82c56367da023456f16ed26770667"}`] // hard coded
    }
  }
};
