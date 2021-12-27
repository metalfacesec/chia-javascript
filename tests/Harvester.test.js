const { Harvester } = require(`${__dirname}/../src/index`);

const harvester = new Harvester();

test('getPlots()', async () => {
    let response = await harvester.getPlots();

    expect(typeof response).toBe('object');
    expect(response.success).toBeTruthy();
    expect(Array.isArray(response.plots)).toBeTruthy()
    expect(Array.isArray(response.not_found_filenames)).toBeTruthy()
    expect(Array.isArray(response.failed_to_open_filenames)).toBeTruthy()
});