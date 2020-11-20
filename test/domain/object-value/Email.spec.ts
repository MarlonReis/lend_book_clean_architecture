import { InvalidEmailError } from '../../../src/domain/errors'
import Email from '../../../src/domain/object-value/Email'

describe('Email', () => {
    test('should create valid email', () => {
        const result = Email.create('valid@email.com.br')
        expect(result.isSuccess()).toBe(true)
        expect(result.value).toBeInstanceOf(Email)
    })

    test('should failure is true when email is invalid', () => {
        const result = Email.create('invalid-email.com.br')
        expect(result.isSuccess()).toBe(false)
        expect(result.isFailure()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidEmailError)
    })

    test('should failure is true when email is undefined', () => {
        const result = Email.create(undefined)
        expect(result.isSuccess()).toBe(false)
        expect(result.isFailure()).toBe(true)
        expect(result.value).toBeInstanceOf(InvalidEmailError)
    })
})
