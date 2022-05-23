const kittyContract = artifacts.require("kittyContract");
const Marketplace = artifacts.require("kittyMarketplace");


module.exports = function (deployer) {
  deployer.deploy(Marketplace, kittyContract.address);
};
