import { InvalidPasswordError } from '../../../src/domain/errors'
import { Password } from '../../../src/domain/object-value'

describe('Password', () => {
    test('should create valid password', () => {
        const result = Password.create('Valid-Password')
        expect(result.isSuccess()).toBe(true)
        expect(result.value).toBeInstanceOf(Password)
     })

     test('should return failure equals true when password is invalid', () => {
        const result = Password.create('invalid')
        expect(result.isFailure()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidPasswordError)
     })

     test('should return failure equals true when password is undefined', () => {
        const result = Password.create(undefined)
        expect(result.isFailure()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidPasswordError)
     })
})
