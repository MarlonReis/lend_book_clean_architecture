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
})
