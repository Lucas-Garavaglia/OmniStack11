const generateUniqueId = require('../../src/utils/generateUniqueld')

describe('Generate Uniqye Id', () => {
  it('should generate an unique ID', () => {
    const id = generateUniqueId()
    expect(id).toHaveLength(8)
  })
})