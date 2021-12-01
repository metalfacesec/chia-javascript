const Rpc = require('./Rpc');

class Wallet extends Rpc {
	constructor(config) {
		super(config);

		this.namespace = 'wallet';
	}

	async getWallets() {
		return await this.makePostRequest('/get_wallets', {}, this.namespace);
	}

	async getPublicKeys() {
		return await this.makePostRequest('/get_public_keys', {}, this.namespace);
	}

	async getPrivateKey(fingerprint) {
		return await this.makePostRequest('/get_private_key', {fingerprint: fingerprint}, this.namespace);
	}

	async getSyncStatus() {
		return await this.makePostRequest('/get_sync_status', {}, this.namespace);
	}

	async getHeightInfo() {
		return await this.makePostRequest('/get_height_info', {}, this.namespace);
	}

	async getWalletBalance(walletId) {
		return await this.makePostRequest('/get_wallet_balance', {wallet_id: walletId}, this.namespace);
	}

	async getFarmedAmount() {
		return await this.makePostRequest('/get_farmed_amount', {}, this.namespace);
	}

	async generateMnemonic() {
		return await this.makePostRequest('/generate_mnemonic', {}, this.namespace);
	}

	async getNetworkInfo() {
		return await this.makePostRequest('/get_network_info', {}, this.namespace);
	}

	async getTransactions(walletId) {
		return await this.makePostRequest('/get_transactions', {wallet_id: walletId}, this.namespace);
	}

	async getTransactionCount(walletId) {
		return await this.makePostRequest('/get_transaction_count', {wallet_id: walletId}, this.namespace);
	}

	async addKey(mnemonic) {
		return await this.makePostRequest('/add_key', {mnemonic: mnemonic, type: 'new_wallet'}, this.namespace);
	}
}

module.exports = Wallet;