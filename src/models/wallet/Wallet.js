const Rpc = require('../rpc/Rpc');

class Wallet extends Rpc {
	constructor() {
		super();

		this.wallets = [];
	}

	async getWallets() {
		return await this.makePostRequest('/get_wallets', {});
	}

	async getPublicKeys() {
		return await this.makePostRequest('/get_public_keys', {});
	}

	async getPrivateKey(fingerprint) {
		return await this.makePostRequest('/get_private_key', {fingerprint: fingerprint});
	}
}

module.exports = Wallet;