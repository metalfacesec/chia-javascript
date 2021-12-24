# chia-javascript
This module is for interacting with the Chia RPC interface. All functions in this module return promises. You may call any of them using async / await or using the 'then()' fucntion.

## Installation
`npm install chia-javascript`

## Examples
Fetching all wallets IDs:
```javascript
const { Wallet } = require('chia-javascript');

async function getWallets() {
        let wallet = new Wallet();
        let wallets = await wallet.getWallets();
        console.log(wallets);
}
getWallets();
```

```javascript
const { Wallet } = require('chia-javascript');

let wallet = new Wallet();
wallet.getWallets()
.then(wallets => {
    console.log(wallets);
})
.catch(error => {
    console.log(error)
});
```

Both of the above output something similar to the object below:
```
{ 
	success: true,
	wallets: [ 
		{ data: '', id: 1, name: 'Chia Wallet', type: 0 },
		{ data: '', id: 2, name: 'Pool wallet', type: 9 }
	] 
}
```

## Documentation
### Wallet
* getWallets()
	* Gets a list of wallets for your key.
	* Response:
		* ``` { "success": true, "wallets": [{ "data": "", "id": 1, name: "Test Wallet", "type": 0 }] } ```
* getPublicKeys()
	* Get all root public keys accessible by the wallet.
	* Response:
		* ``` { "public_key_fingerprints": [ xxxxxxxxxx ], "success": true } ```
* getPrivateKey(fingerprint)
	* Get all root private keys accessible by the wallet.
	* fingerprint can be obtained from the 'public_key_fingerprints' array retunred when calling the getPublicKeys() method above.
	* Response:
		* ``` { "private_key": { "farmer_pk": "xxxxxxxxxxxx", "fingerprint": xxxxxxxxxx, "pk": "xxxxxxxxxxxx", "pool_pk": "xxxxxxxxxxxx", "seed": "xxxxxxxxxxxx", "sk": "xxxxxxxxxxxx" }, "success": true } ```
* getSyncStatus()
	* Gets the sync status of the wallet.
	* Response:
		* ``` { "genesis_initialized": true, "success": true, "synced": true, "syncing": false } ```
* getHeightInfo()
	* Gets information about the current height of the wallet.
	* Response: 
		* ``` { "height": 1326017, "success": true } ```
* getWalletBalance(walletId)
	* Retrieves balances for a wallet
	* The walletID parameter is the 'id' field returned from the getWallets() method above.
	* Response: ``` { "success": true, "wallet_balance": { "confirmed_wallet_balance": 123, "max_send_amount": 123, "pending_change": 0, "pending_coin_removal_count": 0, "spendable_balance": 123, "unconfirmed_wallet_balance": 123, "unspent_coin_count": 1, "wallet_id": 1 } } ```
* getFarmedAmount()
	* Gets information about farming rewards for this wallet.
	* Response:
		* ``` { "farmed_amount": 0, "farmer_reward_amount": 0, "fee_amount": 0, "last_height_farmed": 0, "pool_reward_amount": 0, "success": true } ```
* generateMnemonic()
	* Generate a 24 word mnemonic phrase, used to derive a private key.
	* Response: 
		* ``` { "mnemonic": [ "fake", "test", "fake", "fake", "fake", "fake","fake", "fake", "fake", "fake", "fake", "fake", "fake", "fake", "fake", "fake", "fake", "notable", "fake", "fake", "fake", "fake", "fake", "fake" ], "success": true } ```
* getNetworkInfo()
	* Retrieves some information about the current network.
	* Response:
		* ``` { "network_name": "mainnet", "network_prefix":  "xch" } ```
* getTransactionCount(walletId)
	* Gets the number of transactions in this wallet.
	* Response:
		* ``` { "count": 36, "success": true, "wallet_id": 1 } ```

### TODO
* getTransactions(walletId)
* addKey(mnemonic)