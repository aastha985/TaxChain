const path = require('path');
const HDWalletProvider = require('truffle-hdwallet-provider');

module.exports = {
    // See <http://truffleframework.com/docs/advanced/configuration>
    // to customize your Truffle configuration!
    contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
    networks: {
        development: {
            port: 7545,
            host: '127.0.0.1',
            network_id: 5777,
        },
        ropsten_infura: {
            provider: function () {
                return new HDWalletProvider(
                    'actual creek venue case buzz destroy stone broccoli year case electric security judge slice occur ride giant hamster swarm assist elite defy hold when',
                    'https://ropsten.infura.io/v3/11bb431164e04fcf909d998296b30a4c',
                    0
                );
            },
            network_id: 3,
        },
    },
    compilers: {
        solc: {
            version: '0.8.0',
        },
    },
};
