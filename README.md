# chia-javascript
This module is for interacting with the Chia RPC interface. All functions in this module return promises. You may call any of them using async / await or using the 'then()' fucntion.

## Installation
`npm install chia-javascript`

## Configuration
When you initialize any of the classes in this module you can pass them in a JSON object to override a handful of the default configs. Below are the options you can override and some example config objects.
|Config Name     |Default Value                           |Description                                                | 
|----------------|----------------------------------------|-----------------------------------------------------------|
|rootKeyDir      |(user home dir)/.chia/mainnet/config/ssl|The directory that holds the ssl certificates for your node. **Note that you should not add a trailing slash**|
|hostname|127.0.0.1|The hostname for your node, note that by default your node can only communicate with itself
|walletPort|9256|The port your wallet RPC is listening on
|fullNodePort|8555|The port your full node RPC is listening on
|harvesterPort|8560|The port your harvester RPC is listening on
**Examples**
```javascript
/* Override all configs) */
const { Wallet, FullNode, Havester } = require('chia-javascript');

let config = {
	rootKeyDir: '/home/myuser/chia_dir/mainnet/config/ssl', //Custom chia directory, this points to the ssl folder that contains all your keys
	hostname: '10.0.0.10',
	walletPort: 9999,
	fullNodePort: 9998,
	harvesterPort: 9997
};

// The below will all run using the custom values you set in the object above
let wallet = new Wallet(config);
let fullNode = new FullNode(config);
let havester = new Havester(config);
```

## Examples
**Fetch all wallets IDs:**
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

/* SAMPLE OUTPUT FOR BOTH EXAMPLES ABOVE:
{ 
	success: true,
	wallets: [ 
		{ data: '', id: 1, name: 'Chia Wallet', type: 0 },
		{ data: '', id: 2, name: 'Pool wallet', type: 9 }
	] 
}
*/
```
**Fetch all public keys:**
```javascript
const { Wallet } = require('chia-javascript');

async function getPublicKeys() {
        let wallet = new Wallet();
        let wallets = await wallet.getPublicKeys();
        console.log(wallets);
}
getPublicKeys();

/* SAMPLE OUTPUT:
{ "public_key_fingerprints": [ xxxxxxxxxx ], "success": true }
*/
```
**Fetch blockchain height info:**
```javascript
const { Wallet } = require('chia-javascript');

async function getHeightInfo() {
        let wallet = new Wallet();
        let wallets = await wallet.getHeightInfo();
        console.log(wallets);
}
getHeightInfo();

/* SAMPLE OUTPUT:
{ "height": 1326017, "success": true }
*/
```
**Fetch blockchain state:**
```javascript
const { FullNode } = require('chia-javascript');
  
async function getBlockchainState() {
        let fullNode = new FullNode();
        let blockchainState = await fullNode.getBlockchainState();
        console.log(blockchainState);
}
getBlockchainState();

/* SAMPLE OUTPUT:
{ blockchain_state:
   { difficulty: 2752,
     genesis_challenge_initialized: true,
     mempool_size: 24,
     peak:
      { challenge_block_info_hash:
         '0x111111111111111111111111111111111111111111111111111',
        challenge_vdf_output: [Object],
        deficit: 0,
        farmer_puzzle_hash:
         '0x111111111111111111111111111111111111111111111111111',
        fees: null,
        finished_challenge_slot_hashes: null,
        finished_infused_challenge_slot_hashes: null,
        finished_reward_slot_hashes: null,
        header_hash:
         '0x111111111111111111111111111111111111111111111111111',
        height: 11111111111,
        infused_challenge_vdf_output: [Object],
        overflow: false,
        pool_puzzle_hash:
         '0x111111111111111111111111111111111111111111111111111',
        prev_hash:
         '0x111111111111111111111111111111111111111111111111111',
        prev_transaction_block_hash: null,
        prev_transaction_block_height: 11111111111,
        required_iters: 11111111111,
        reward_claims_incorporated: null,
        reward_infusion_new_challenge:
         '0x111111111111111111111111111111111111111111111111111',
        signage_point_index: 11111111111,
        sub_epoch_summary_included: null,
        sub_slot_iters: 11111111111,
        timestamp: null,
        total_iters: 11111111111,
        weight: 11111111111 },
     space: 11111111111,
     sub_slot_iters: 11111111111,
     sync:
      { sync_mode: false,
        sync_progress_height: 0,
        sync_tip_height: 0,
        synced: true } },
  success: true }
*/
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

### FullNode
* getBlockchainState()
	* Returns current information about the blockchain, including the peak, sync information, difficulty, mempool size, etc.
	* Response:
		* ``` { "blockchain_state": { "difficulty": 2752, "genesis_challenge_initialized": true, "mempool_size": 24, "peak": { "challenge_block_info_hash": "0x111111111111111111111111111111111111111111111111111", "challenge_vdf_output": [Object], "deficit": 0, farmer_puzzle_hash": "0x111111111111111111111111111111111111111111111111111", "fees": null, "finished_challenge_slot_hashes": null, "finished_infused_challenge_slot_hashes": null, "finished_reward_slot_hashes": null, "header_hash": "0x111111111111111111111111111111111111111111111111111", "height": 11111111111, "infused_challenge_vdf_output": [Object], "overflow": false, "pool_puzzle_hash": "0x111111111111111111111111111111111111111111111111111", "prev_hash": "0x111111111111111111111111111111111111111111111111111", "prev_transaction_block_hash": null, "prev_transaction_block_height": 11111111111, "required_iters": 11111111111, "reward_claims_incorporated": null, "reward_infusion_new_challenge": "0x111111111111111111111111111111111111111111111111111", "signage_point_index": 11111111111, "sub_epoch_summary_included": null, "sub_slot_iters": 11111111111, "timestamp": null, "total_iters": 11111111111, "weight": 11111111111 }, "space": 11111111111, "sub_slot_iters":  11111111111, "sync": { "sync_mode": false, "sync_progress_height": 0, "sync_tip_height": 0, "synced": true } }, "success": true } ```
### Harvester

### TODO
* Wallet
	* getTransactions(walletId)
	* addKey(mnemonic)