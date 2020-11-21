import { EncryptsPassword } from '../../../src/data/protocol/EncryptsPassword'
import { CreateUserAccountRepository } from '../../../src/data/repositories/CreateUserAccountRepository'
import { DbCreateUserAccount } from '../../../src/data/usecase/DbCreateUserAccount'
import { CreateUserAccountError } from '../../../src/domain/errors'
import { User } from '../../../src/domain/model/user/User'
import { Password } from '../../../src/domain/object-value'
import { CreateUserAccount } from '../../../src/domain/usecase/CreateUserAccount'
import { Either, success } from '../../../src/shared/Either'

const makeEncryptsStub = (): EncryptsPassword => {
    class EncryptsPasswordStub implements EncryptsPassword {
        encrypt (password: Password): Password {
            return password
        }
    }
    return new EncryptsPasswordStub()
}

const makeCreateUserAccountRepositoryStub = (): CreateUserAccountRepository => {
    class CreateUserAccountRepositoryStub implements CreateUserAccountRepository {
        create (user: User): Either<CreateUserAccountError, User> {
            return success(user)
        }
    }
    return new CreateUserAccountRepositoryStub()
}

interface TypeSut {
    encryptsStub: EncryptsPassword
    createUserAccountRepositoryStub: CreateUserAccountRepository
    sut: CreateUserAccount
}

const makeSutFactory = (): TypeSut => {
    const encryptsStub = makeEncryptsStub()
    const createUserAccountRepositoryStub = makeCreateUserAccountRepositoryStub()
    const sut = new DbCreateUserAccount(encryptsStub, createUserAccountRepositoryStub)
    return { sut, encryptsStub, createUserAccountRepositoryStub }
}

describe('DbCreateUserAccount', () => {
    test('should create new account with success', () => {
        const { sut } = makeSutFactory()
        const response = sut.create({
            name: 'Any Name',
            email: 'valid@email.com.br',
            password: 'Any@Password'
        })

        expect(response.isSuccess()).toBe(true)
        expect(response.value).toBeInstanceOf(User)
        expect(response.value).toMatchObject({
            name: { value: 'Any Name' },
            email: { value: 'valid@email.com.br' },
            password: { value: expect.any(String) }
        })
    })
})
