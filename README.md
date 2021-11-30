# chia-client
Chia-client is a node module for interacting with the Chia RPC interface. All functions in this module return promises. You may call any of them using async / await or using the 'then()' fucntion. 

## Docs
Below you will find examples and details on all of the supported RPC calls.

### Wallet
##### getWallets()
This method will return an array of the wallets for the provided key
```javascript
const { Wallet } = require('chia-client');

async function getWallets() {
        let wallet = new Wallet();
        let wallets = await wallet.getWallets();
        console.log(wallets);
}
getWallets();
```

```javascript
const { Wallet } = require('chia-client');

let wallet = new Wallet();
wallet.getWallets()
.then(wallets => {
    console.log(wallets);
})
.catch(error => {
    console.log(error)
});
```