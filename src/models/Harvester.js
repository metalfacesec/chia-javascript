const Rpc = require('./Rpc');

class Harvester extends Rpc {
	constructor(config) {
		super(config);

		this.namespace = 'harvester';
	}

	async getPlots() {
		return await this.makePostRequest('/get_plots', {}, this.namespace);
	}
}

module.exports = Harvester;