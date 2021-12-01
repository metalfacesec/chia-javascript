const fs = require('fs');
const https = require('https');

class Rpc {
	constructor(config) {
		if (config === null || typeof config !== 'object') {
			return console.log('ERROR: Invalid config passed into constructor!');
		}

		if (typeof config.rootKeyDir !== 'string' || !config.rootKeyDir.length) {
			return console.log('ERROR: Invalid rootKeyDir passed into constructor!');
		}
		this.rootKeyDir = config.rootKeyDir;
		
		this.hostname = '127.0.0.1';
		if (typeof config.hostname === 'string' && config.hostname.length) {
			this.hostname = config.hostname;
		}

		this.walletPort = 9256;
		if (typeof config.walletPort !== 'undefined' && Number.isInteger(config.walletPort)) {
			this.walletPort = config.walletPort;
		}
	}
	
	makePostRequest(endpoint, data, keyNamespace) {
		return new Promise((resolve, reject) => {
			let port = null;
			if (keyNamespace === 'wallet') {
				port = this.walletPort;
			} else if (keyNamespace === 'full_node') {
				port = 8555;
			} else if (keyNamespace === 'harvester') {
				port = 8560;
			}

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