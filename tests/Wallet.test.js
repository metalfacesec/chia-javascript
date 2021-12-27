const { Wallet } = require(`${__dirname}/../src/index`);

const wallet = new Wallet();

test('getWallets()', async () => {
    let response = await wallet.getWallets();

    expect(response.success).toBeTruthy();
    expect(Array.isArray(response.wallets)).toBeTruthy();
    expect(response.wallets.length).toBeGreaterThanOrEqual(1);
});

test('getPublicKeys()', async () => {
    let response = await wallet.getPublicKeys();

    expect(response.success).toBeTruthy();
    expect(Array.isArray(response.public_key_fingerprints)).toBeTruthy();
    expect(response.public_key_fingerprints.length).toBeGreaterThanOrEqual(1);
});

test('getPublicKeys(fingerprint)', async () => {
    let response = await wallet.getPublicKeys();

    expect(response.success).toBeTruthy();
    expect(Array.isArray(response.public_key_fingerprints)).toBeTruthy();
    expect(response.public_key_fingerprints.length).toBeGreaterThanOrEqual(1);

    response = await wallet.getPrivateKey(response.public_key_fingerprints[0]);
    expect(response.success).toBeTruthy();
    expect(typeof response.private_key).toBe('object');
    expect(Object.keys(response.private_key).includes('farmer_pk')).toBeTruthy();
    expect(Object.keys(response.private_key).includes('fingerprint')).toBeTruthy();
    expect(Object.keys(response.private_key).includes('pk')).toBeTruthy();
    expect(Object.keys(response.private_key).includes('pool_pk')).toBeTruthy();
    expect(Object.keys(response.private_key).includes('seed')).toBeTruthy();
    expect(Object.keys(response.private_key).includes('sk')).toBeTruthy();
});

test('getSyncStatus()', async () => {
    let response = await wallet.getSyncStatus();

    expect(typeof response).toBe('object');
    expect(response.success).toBeTruthy();
    expect(Object.keys(response).includes('genesis_initialized')).toBeTruthy();
    expect(Object.keys(response).includes('synced')).toBeTruthy();
    expect(Object.keys(response).includes('syncing')).toBeTruthy();
});

test('getHeightInfo()', async () => {
    let response = await wallet.getHeightInfo();

    expect(typeof response).toBe('object');
    expect(response.success).toBeTruthy();
    expect(Object.keys(response).includes('height')).toBeTruthy();
    expect(response.height).toBeGreaterThanOrEqual(1);
});

test('getWalletBalance(walletID)', async () => {
    let response = await wallet.getWallets();

    expect(response.success).toBeTruthy();
    expect(Array.isArray(response.wallets)).toBeTruthy();
    expect(response.wallets.length).toBeGreaterThanOrEqual(1);

    let balanceResponse = await wallet.getWalletBalance(response.wallets[0].id);

    expect(balanceResponse.success).toBeTruthy();
    expect(typeof balanceResponse.wallet_balance).toBe('object');
    expect(Object.keys(balanceResponse.wallet_balance).includes('confirmed_wallet_balance')).toBeTruthy();
    expect(Object.keys(balanceResponse.wallet_balance).includes('max_send_amount')).toBeTruthy();
    expect(Object.keys(balanceResponse.wallet_balance).includes('pending_change')).toBeTruthy();
    expect(Object.keys(balanceResponse.wallet_balance).includes('pending_coin_removal_count')).toBeTruthy();
    expect(Object.keys(balanceResponse.wallet_balance).includes('spendable_balance')).toBeTruthy();
    expect(Object.keys(balanceResponse.wallet_balance).includes('unconfirmed_wallet_balance')).toBeTruthy();
    expect(Object.keys(balanceResponse.wallet_balance).includes('unspent_coin_count')).toBeTruthy();
    expect(Object.keys(balanceResponse.wallet_balance).includes('wallet_id')).toBeTruthy();
});

test('getFarmedAmount()', async () => {
    let response = await wallet.getFarmedAmount();

    expect(typeof response).toBe('object');
    expect(response.success).toBeTruthy();
    expect(Object.keys(response).includes('farmed_amount')).toBeTruthy();

    expect(Object.keys(response).includes('farmer_reward_amount')).toBeTruthy();
    expect(Object.keys(response).includes('fee_amount')).toBeTruthy();
    expect(Object.keys(response).includes('last_height_farmed')).toBeTruthy();
    expect(Object.keys(response).includes('pool_reward_amount')).toBeTruthy();
});

test('generateMnemonic()', async () => {
    let response = await wallet.generateMnemonic();

    expect(typeof response).toBe('object');
    expect(response.success).toBeTruthy();
    expect(Array.isArray(response.mnemonic)).toBeTruthy();
    expect(response.mnemonic.length).toBe(24);
});

test('getNetworkInfo()', async () => {
    let response = await wallet.getNetworkInfo();

    expect(typeof response).toBe('object');
    expect(response.success).toBeTruthy();
    expect(Object.keys(response).includes('network_name')).toBeTruthy();
    expect(Object.keys(response).includes('network_prefix')).toBeTruthy();
});

test('getTransactionCount(walletId)', async () => {
    let response = await wallet.getWallets();

    expect(response.success).toBeTruthy();
    expect(Array.isArray(response.wallets)).toBeTruthy();
    expect(response.wallets.length).toBeGreaterThanOrEqual(1);

    let transactionCount = await wallet.getTransactionCount(response.wallets[0].id);

    expect(transactionCount.success).toBeTruthy();
    expect(Object.keys(transactionCount).includes('count')).toBeTruthy();
    expect(Object.keys(transactionCount).includes('wallet_id')).toBeTruthy();
});

test('getTransactions(walletId)', async () => {
    let response = await wallet.getWallets();

    expect(response.success).toBeTruthy();
    expect(Array.isArray(response.wallets)).toBeTruthy();
    expect(response.wallets.length).toBeGreaterThanOrEqual(1);

    let transactions = await wallet.getTransactions(response.wallets[0].id);

    expect(transactions.success).toBeTruthy();
    expect(typeof transactions.transactions).toBe('object');
    expect(Array.isArray(transactions.transactions)).toBeTruthy();
});

test('addKey(mnemonic)', async () => {
    let mnemonic = await wallet.generateMnemonic();
    let mnemonicString = mnemonic.mnemonic.join(" ");

    let response = await wallet.addKey([mnemonicString]);
    expect(typeof response).toBe('object');
    expect(response.success).toBeTruthy();
});