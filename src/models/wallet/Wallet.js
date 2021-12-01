const Rpc = require('../rpc/Rpc');

class Wallet extends Rpc {
	constructor(config) {
		super(config);

		this.wallets = [];
	}

	async getWallets() {
		return await this.makePostRequest('/get_wallets', {}, 'wallet');
	}

	async getPublicKeys() {
		return await this.makePostRequest('/get_public_keys', {}, 'wallet');
	}

	async getPrivateKey(fingerprint) {
		return await this.makePostRequest('/get_private_key', {fingerprint: fingerprint}, 'wallet');
	}

	async getSyncStatus() {
		return await this.makePostRequest('/get_sync_status', {}, 'wallet');
	}

	async getHeightInfo() {
		return await this.makePostRequest('/get_height_info', {}, 'wallet');
	}

	async getWalletBalance(walletId) {
		return await this.makePostRequest('/get_wallet_balance', {wallet_id: walletId}, 'wallet');
	}

	async getFarmedAmount() {
		return await this.makePostRequest('/get_farmed_amount', {}, 'wallet');
	}

	async generateMnemonic() {
		return await this.makePostRequest('/generate_mnemonic', {}, 'wallet');
	}

	async getNetworkInfo() {
		return await this.makePostRequest('/get_network_info', {}, 'wallet');
	}

	async getTransactions(walletId) {
		return await this.makePostRequest('/get_transactions', {wallet_id: walletId}, 'wallet');
	}

	async getTransactionCount(walletId) {
		return await this.makePostRequest('/get_transaction_count', {wallet_id: walletId}, 'wallet');
	}
}

module.exports = Wallet;