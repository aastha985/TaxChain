const Transact = artifacts.require('Transact');
const Govt = artifacts.require('GovtDetails');
const KYC = artifacts.require('KYC');

const chai = require('./setupChai');
const BN = web3.utils.BN;
const expect = chai.expect;

contract('Transact Test', async (accounts) => {
    it('should not allow non KYCed to buy tokens', async () => {
        let govt = await Govt.deployed();
        let instance = await Transact.deployed();
        let transactAddress = Transact.address;
        //prettier-ignore
        expect(instance.sendTransaction({ to: transactAddress, from: accounts[2], value: 1 })).to.be.rejected;
    });
    it('KYCed should be able to buy tokens', async () => {
        let govt = await Govt.deployed();
        let kyc = await KYC.deployed();
        kyc.completeKYC(accounts[1]);
        let instance = await Transact.deployed();
        let transactAddress = Transact.address;
        //prettier-ignore
        await instance.sendTransaction({ to: transactAddress, from: accounts[1], value: 1 });
        //prettier-ignore
        expect(instance.tokenBalance(accounts[1])).to.eventually.be.a.bignumber.equals(new BN('1'));
    });
    it('should be able to pay tax using tokens', async () => {
        let instance = await Transact.deployed();
        //prettier-ignore
        expect(instance.payTax(1, { from: accounts[1] })).to.eventually.be.fulfilled;
        expect(
            instance.tokenBalance(accounts[1])
        ).to.eventually.be.a.bignumber.equals(new BN('0'));
        expect(
            instance.taxPaid(accounts[1])
        ).to.eventually.be.a.bignumber.equals(new BN('1'));
    });
    it('should not be able to pay tax using less tokens', async () => {
        let instance = await Transact.deployed();
        //prettier-ignore
        return expect(instance.payTax(1000, { from: accounts[1] })).to.eventually.be.rejected;
    });
});
