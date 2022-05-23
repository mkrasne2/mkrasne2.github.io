const kittyContract = artifacts.require("kittyContract");
const Marketplace = artifacts.require("kittyMarketplace");


module.exports = function (deployer) {
  deployer.deploy(Marketplace, "0xc530488a5ba73DeA4db6b7D990438532146ACEC9");
};
