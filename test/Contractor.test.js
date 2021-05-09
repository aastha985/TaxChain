const Contractor = artifacts.require('Contractor');

const chai = require('./setupChai');
const BN = web3.utils.BN;
const expect = chai.expect;

contract('Contractor', (accounts) => {
    it('should be able to create new work', async () => {
        let instance = await Contractor.deployed();
        return expect(instance.createNewWork()).to.eventually.be.fulfilled;
    });
});
