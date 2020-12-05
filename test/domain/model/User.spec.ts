import { InvalidParamError } from '../../../src/domain/errors'
import { User } from '../../../src/domain/model/User'

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
            name: 'Any Name',
            email: 'valid@email.com.br',
            password: 'Valid@Password'
        })
    })

    test('should return error when name is invalid', () => {
        const sut = User.create({
            email: 'valid@email.com.br',
            name: 'An',
            password: 'Valid@Password'
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidParamError)
    })

    test('should return error when email is invalid', () => {
        const sut = User.create({
            email: 'valid-email.com.br',
            name: 'Any Name',
            password: 'Valid@Password'
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidParamError)
    })

    test('should return error when password is invalid', () => {
        const sut = User.create({
            email: 'valid@email.com.br',
            name: 'Any Name',
            password: 'invalid'
        })

        expect(sut.isFailure()).toBe(true)
        expect(sut.value).toBeInstanceOf(InvalidParamError)
    })
})
