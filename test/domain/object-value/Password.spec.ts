import { Password } from '../../../src/domain/object-value'

describe('Password', () => {
    test('should create valid password', () => {
        const result = Password.create('Valid-Password')
        expect(result.isSuccess()).toBe(true)
        expect(result.value).toBeInstanceOf(Password)
     })
})
