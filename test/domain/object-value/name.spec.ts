import { Name } from '../../../src/domain/object-value/Name'

describe('Name', () => {
  test('should be create valid name', () => {
    const eitherName = Name.create('Any Name')

    expect(eitherName.isSuccess()).toBe(true)
    expect(eitherName.value).toBeInstanceOf(Name)
  })
})
