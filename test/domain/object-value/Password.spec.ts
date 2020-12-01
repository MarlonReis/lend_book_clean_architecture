import { InvalidPasswordError } from '../../../src/domain/errors'
import { Password } from '../../../src/domain/object-value'

describe('Password', () => {
   test('should create valid password', () => {
      const result = Password.create('Valid-Password')
      expect(result.isSuccess()).toBe(true)
      expect(result.value).toBeInstanceOf(Password)
      expect((result.value as any).getValue()).toBe('Valid-Password')
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

   test('should return password value', () => {
      const result = Password.create('Valid@Password')
      const password = result.value
      expect(password).toMatchObject({
         value: 'Valid@Password'
      })
   })

   test('should return message error', () => {
      const result = Password.create('Valid')
      const password = result.value
      expect(password).toMatchObject({
         message: "Attribute 'password' equals Valid is invalid!"
      })
   })
})
