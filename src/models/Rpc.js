const os = require('os');
const fs = require('fs');
const https = require('https');

class Rpc {
	constructor(config) {
		if (config === null || typeof config !== 'object') {
			config = {};
		}

		this.rootKeyDir = `${os.homedir()}/.chia/mainnet/config/ssl`;
		if (typeof config.rootKeyDir === 'string' && config.rootKeyDir.length) {
			this.rootKeyDir = config.rootKeyDir;
		}
		
		
		this.hostname = '127.0.0.1';
		if (typeof config.hostname === 'string' && config.hostname.length) {
			this.hostname = config.hostname;
		}

		this.walletPort = 9256;
		if (typeof config.walletPort !== 'undefined' && Number.isInteger(config.walletPort)) {
			this.walletPort = config.walletPort;
		}

		this.fullNodePort = 8555;
		if (typeof config.fullNodePort !== 'undefined' && Number.isInteger(config.fullNodePort)) {
			this.fullNodePort = config.fullNodePort;
		}

		this.harvesterPort = 8560;
		if (typeof config.harvesterPort !== 'undefined' && Number.isInteger(config.harvesterPort)) {
			this.harvesterPort = config.harvesterPort;
		}
	}

	getPortFromNamespace(namespace) {
		if (namespace === 'wallet') {
			return this.walletPort;
		}
		if (namespace === 'full_node') {
			return this.fullNodePort;
		}
		if (namespace === 'harvester') {
			return this.harvesterPort;
		}
		return null;
	}
	
	makePostRequest(endpoint, data, keyNamespace) {
		return new Promise((resolve, reject) => {
			let port = this.getPortFromNamespace(keyNamespace);
			if (port === null) {
				return console.log('ERROR: Rpc.makePostRequest - Could not match port to namespace!');
			}

			let postData = JSON.stringify(data);
	
			let options = {
				key: fs.readFileSync(`${this.rootKeyDir}/${keyNamespace}/private_${keyNamespace}.key`),
				cert: fs.readFileSync(`${this.rootKeyDir}/${keyNamespace}/private_${keyNamespace}.crt`),
				hostname: this.hostname,
				port: port,
				path: endpoint,
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Content-Length': postData.length
				}
			};
	
			var req = https.request(options, (res) => {
				res.on('data', d => {
					let response = JSON.parse(d);
					if (response.success === true) {
						return resolve(response);
					}
					reject(d);
				});
			});
	
			req.on('error', (e) => {
				reject(e);
			});
	
			req.write(postData);
			req.end();
		});
	}
}

module.exports = Rpc;