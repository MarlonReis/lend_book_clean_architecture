import { InvalidEmailError, InvalidNameError } from '../../../src/domain/errors'
import { User } from '../../../src/domain/model/user/User'

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
})
