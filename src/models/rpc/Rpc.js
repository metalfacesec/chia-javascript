const fs = require('fs');
const https = require('https');

class Rpc {
	makePostRequest(endpoint, data) {
		return new Promise((resolve, reject) => {
			let postData = JSON.stringify(data);
	
			let options = {
				key: fs.readFileSync(''),
				cert: fs.readFileSync(''),
				hostname: '127.0.0.1',
				port: 9256,
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