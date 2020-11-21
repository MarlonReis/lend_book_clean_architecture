import { EncryptsPassword } from '../../../src/data/protocol/EncryptsPassword'
import { CreateUserAccountRepository } from '../../../src/data/repositories/CreateUserAccountRepository'
import { DbCreateUserAccount } from '../../../src/data/usecase/DbCreateUserAccount'
import { CreateUserAccountError } from '../../../src/domain/errors'
import { User } from '../../../src/domain/model/user/User'
import { Password } from '../../../src/domain/object-value'
import { Either, success } from '../../../src/shared/Either'

describe('DbCreateUserAccount', () => {
    test('should create new account with success', () => {
        class EncryptsPasswordStub implements EncryptsPassword {
            encrypt (password: Password): Password {
                return password
            }
        }

        class CreateUserAccountRepositoryStub implements CreateUserAccountRepository {
            create (user: User): Either<CreateUserAccountError, User> {
                return success(user)
            }
        }

        const encryptsPasswordStub = new EncryptsPasswordStub()
        const createUserAccountRepositoryStub = new CreateUserAccountRepositoryStub()
        const sut = new DbCreateUserAccount(
            encryptsPasswordStub,
            createUserAccountRepositoryStub)
        const response = sut.create({
            name: 'Any Name',
            email: 'valid@email.com.br',
            password: 'Any@Password'
        })

        expect(response.isSuccess()).toBe(true)
    })
})
