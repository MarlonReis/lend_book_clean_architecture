import { EncryptsPassword } from '../../../src/data/protocol/EncryptsPassword'
import { CreateUserAccountRepository } from '../../../src/data/repositories/CreateUserAccountRepository'
import { DbCreateUserAccount } from '../../../src/data/usecase/DbCreateUserAccount'
import { CreateUserAccountError, InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../../../src/domain/errors'
import { User } from '../../../src/domain/model/user/User'
import { Password } from '../../../src/domain/object-value'
import { CreateUserAccount } from '../../../src/domain/usecase/CreateUserAccount'
import { Either, success, failure } from '../../../src/shared/Either'

const makeEncryptsStub = (): EncryptsPassword => {
    class EncryptsPasswordStub implements EncryptsPassword {
        encrypt = async (password: Password): Promise<Either<InvalidPasswordError, Password>> => {
            return await Promise.resolve(success(password))
        }
    }
    return new EncryptsPasswordStub()
}

const makeCreateUserAccountRepositoryStub = (): CreateUserAccountRepository => {
    class CreateUserAccountRepositoryStub implements CreateUserAccountRepository {
        create = async (user: User): Promise<Either<CreateUserAccountError, User>> => {
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
    test('should create new account with success', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.create({
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

    test('should return failure true when email is invalid', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.create({
            name: 'Any Name',
            email: 'valid-email.com.br',
            password: 'Any@Password'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(CreateUserAccountError)
        expect(response.value).toMatchObject({
            message: "attribute 'email' equals the valid-email.com.br is invalid!",
            cause: new InvalidEmailError('valid-email.com.br')
        })
    })

    test('should return failure true when name is invalid', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.create({
            name: 'in',
            email: 'valid@email.com.br',
            password: 'Any@Password'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(CreateUserAccountError)
        expect(response.value).toMatchObject({
            message: "Attribute 'name' equals in is invalid!",
            cause: new InvalidNameError('in')
        })
    })

    test('should return failure true when password is invalid', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.create({
            name: 'Valid Name',
            email: 'valid@email.com.br',
            password: 'invalid'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(CreateUserAccountError)
        expect(response.value).toMatchObject({
            message: "Attribute 'password' equals invalid is invalid!",
            cause: new InvalidPasswordError('invalid')
        })
    })

    test('should call encrypt with correct param', async () => {
        const { sut, encryptsStub } = makeSutFactory()
        const encryptSpy = jest.spyOn(encryptsStub, 'encrypt')
        await sut.create({
            name: 'Valid Name',
            email: 'valid@email.com.br',
            password: 'Valid@Password'
        })
        const password = Password.create('Valid@Password')
        expect(encryptSpy).toBeCalledWith(password.value)
    })

    test('should return isFailure true when encrypt throws error', async () => {
        const { sut, encryptsStub } = makeSutFactory()
        jest.spyOn(encryptsStub, 'encrypt')
            .mockReturnValueOnce(Promise.resolve(failure(new InvalidPasswordError('pwd'))))

            const response = await sut.create({
            name: 'Valid Name',
            email: 'valid@email.com.br',
            password: 'Valid@Password'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toEqual(new CreateUserAccountError(new InvalidPasswordError('pwd')))
    })

    test('should call repository with correct param', async () => {
        const { sut, createUserAccountRepositoryStub } = makeSutFactory()
        const createSpy = jest.spyOn(createUserAccountRepositoryStub, 'create')
        await sut.create({
            name: 'Valid Name',
            email: 'valid@email.com.br',
            password: 'Valid@Password'
        })

        expect(createSpy).toBeCalledWith({
            name: { value: 'Valid Name' },
            email: { value: 'valid@email.com.br' },
            password: { value: 'Valid@Password' },
            getEmail: expect.any(Function),
            getPassword: expect.any(Function),
            getName: expect.any(Function)
        })
    })

    test('should return error when repository return', async () => {
        const { sut, createUserAccountRepositoryStub } = makeSutFactory()
        jest.spyOn(createUserAccountRepositoryStub, 'create')
            .mockReturnValueOnce(Promise.resolve(failure(new Error('any message'))))
        const response = await sut.create({
            name: 'Valid Name',
            email: 'valid@email.com.br',
            password: 'Valid@Password'
        })

        expect(response.isFailure()).toBe(true)
        expect(response.value).toEqual(new Error('any message'))
    })
})
