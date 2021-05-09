'use strict';
const chai = require('chai');
const BN = web3.utils.BN;

const chaiBN = require('chai-bn')(BN);
chai.use(chaiBN);

const chaiAsPromised = require('chai-as-promised');
const { isMainThread } = require('worker_threads');
const { contracts_build_directory } = require('../truffle-config');
chai.use(chaiAsPromised);

const expect = chai.expect;

module.exports = chai;
