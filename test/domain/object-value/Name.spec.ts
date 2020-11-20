import { InvalidNameError } from '../../../src/domain/errors'
import { Name } from '../../../src/domain/object-value/Name'

describe('Name', () => {
  test('should be create valid name', () => {
    const eitherName = Name.create('Any Name')

    expect(eitherName.isSuccess()).toBe(true)
    expect(eitherName.value).toBeInstanceOf(Name)
  })

  test('should return failure when nome have only two characters', () => {
    const eitherName = Name.create('An')

    expect(eitherName.isSuccess()).toBe(false)
    expect(eitherName.isFailure()).toBe(true)
    expect(eitherName.value).toBeInstanceOf(InvalidNameError)
  })

  test('should return failure when nome undefined', () => {
    const eitherName = Name.create(undefined)
    expect(eitherName.isFailure()).toBe(true)
  })
})
