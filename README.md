# chia-javascript
Chia-client is a node module for interacting with the Chia RPC interface. All functions in this module return promises. You may call any of them using async / await or using the 'then()' fucntion. 

## Docs
You can find the full documentation for the library here: https://github.com/metalfacesec/chia-javascript/wiki/Documentation

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
