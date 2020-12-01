import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../../../src/domain/errors'
import { User } from '../../../src/domain/model/user/User'
import { Name, Password } from '../../../src/domain/object-value'
import Email from '../../../src/domain/object-value/Email'

describe('User', () => {
    test('should create user with success', () => {
        const sut = User.create({
            email: 'valid@email.com.br',
            name: 'Any Name',
            password: 'Valid@Password'
        })

        expect(sut.isSuccess()).toBe(true)
        expect(sut.value).toBeInstanceOf(User)
        expect(sut.value).toMatchObject({
            name: { value: 'Any Name' },
            email: { value: 'valid@email.com.br' },
            password: { value: 'Valid@Password' }
        })
        expect((sut.value as User).getEmail()).toBeInstanceOf(Email)
        expect((sut.value as User).getIdEntity()).toBe(undefined)
        expect((sut.value as User).getName()).toBeInstanceOf(Name)
        expect((sut.value as User).getPassword()).toBeInstanceOf(Password)
    })

    test('should return error when name is invalid', () => {
        const sut = User.create({
            email: 'valid@email.com.br',
            name: 'An',
            password: 'Valid@Password'
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidNameError)
    })

    test('should return error when email is invalid', () => {
        const sut = User.create({
            email: 'valid-email.com.br',
            name: 'Any Name',
            password: 'Valid@Password'
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidEmailError)
    })

    test('should return error when password is invalid', () => {
        const sut = User.create({
            email: 'valid@email.com.br',
            name: 'Any Name',
            password: 'invalid'
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidPasswordError)
    })
})
