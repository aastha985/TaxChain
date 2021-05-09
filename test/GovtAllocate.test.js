const GovtAllocate = artifacts.require('GovtAllocate');
const Govt = artifacts.require('GovtDetails');

const chai = require('./setupChai');
const BN = web3.utils.BN;
const expect = chai.expect;

contract('GovtAllocate', async (accounts) => {
    it('govt should be able to allocate and send money', async () => {
        let govt = await Govt.deployed();
        await govt.setConstituencyAddress('delhi', accounts[1], {
            from: accounts[0],
        });
        let instance = await GovtAllocate.deployed();
        await instance.allocateFunds('delhi', { from: accounts[0], value: 1 });
        expect(
            instance.getAllocation('delhi')
        ).to.eventually.be.a.bignumber.equals(new BN('1'));
    });
    it('should not allow non-govt accounts to allocate and send money', async () => {
        let govt = await Govt.deployed();
        await govt.setConstituencyAddress('delhi', accounts[1], {
            from: accounts[0],
        });
        let instance = await GovtAllocate.deployed();
        return expect(
            instance.allocateFunds('delhi', { from: accounts[1], value: 1 })
        ).to.eventually.be.rejected;
    });
});
