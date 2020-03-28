const generateUniqueID = require('../../src/utils/generateUniqueId');

describe('generate Unique ID', () => {
  it('should generate an unique ID', () => {
    const id = generateUniqueID();

    expect(id).toHaveLength(8);
  });
});