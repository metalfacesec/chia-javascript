const Wallet = require('./models/Wallet');
const FullNode = require('./models/FullNode');
const Harvester = require('./models/Harvester');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

module.exports = { Wallet, FullNode, Harvester };