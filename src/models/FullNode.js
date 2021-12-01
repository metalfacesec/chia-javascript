const Rpc = require('./rpc/Rpc');

class FullNode extends Rpc {
	constructor(config) {
		super(config);

		this.namespace = 'full_node';
	}

	async getBlockchainState() {
		return await this.makePostRequest('/get_blockchain_state', {}, this.namespace);
	}
}

module.exports = FullNode;