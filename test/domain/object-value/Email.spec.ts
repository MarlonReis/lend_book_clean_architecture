import { InvalidEmailError } from '../../../src/domain/errors'
import Email from '../../../src/domain/object-value/Email'
import { Either } from '../../../src/shared/Either'

describe('Email', () => {
    test('should create valid email', () => {
        const result = Email.create('valid@email.com.br')
        expect(result.isSuccess()).toBe(true)
        expect(result.value).toBeInstanceOf(Email)
        expect((result.value as any).getValue()).toBe('valid@email.com.br')
    })

    test('should return email data', () => {
        const result: Either<InvalidEmailError, Email> = Email.create('valid@email.com.br')
        const email = result.value
        expect(email).toMatchObject({ value: 'valid@email.com.br' })
    })

    test('should return error message', () => {
        const result: Either<InvalidEmailError, Email> = Email.create('valid-email.com.br')
        const email = result.value
        expect(email).toMatchObject({ message: "attribute 'email' equals the valid-email.com.br is invalid!" })
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
