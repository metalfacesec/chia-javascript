const { FullNode } = require(`${__dirname}/../src/index`);

const node = new FullNode();

test('getBlockchainState()', async () => {
    let response = await node.getBlockchainState();

    expect(typeof response).toBe('object');
    expect(response.success).toBeTruthy();
});