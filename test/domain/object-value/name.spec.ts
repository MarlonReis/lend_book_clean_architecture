import { Name } from '../../../src/domain/object-value/Name'

describe('Name', () => {
  test('should be create valid name', () => {
    const name = new Name('Any Name')
    expect(name.value).toBe('Any Name')
  })
})
