const Wallet = require('./models/wallet/Wallet');

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

module.exports = { Wallet };