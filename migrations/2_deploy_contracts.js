const KYC = artifacts.require('KYC');
const GovtDetails = artifacts.require('GovtDetails');
const Transaction = artifacts.require('Transact');
const GovtAllocate = artifacts.require('GovtAllocate');
const Contractor = artifacts.require('Contractor');

module.exports = async (deployer) => {
    let accounts = await web3.eth.getAccounts();
    await deployer.deploy(KYC);
    await deployer.deploy(GovtDetails);
    let instance = await GovtDetails.deployed();
    instance.setGovtAddress(accounts[0]);
    await deployer.deploy(Transaction, KYC.address, GovtDetails.address);
    await deployer.deploy(GovtAllocate, GovtDetails.address);
    await deployer.deploy(Contractor);
};
