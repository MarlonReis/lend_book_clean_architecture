import { CreateUserAccountError } from '@/domain/errors'
import { User } from '@/domain/model/User'
import { CreateAccount, CreateUserAccount } from '@/domain/usecase/CreateUserAccount'
import { CreateAccountController } from '@/presentation/controller/CreateAccountController'
import { MissingParamError } from '@/presentation/error/MissingParamError'
import { internalServerError, unProcessableEntity } from '@/presentation/helper/HttpResponseHelper'
import { Either, failure } from '@/shared/Either'

const makeCreateAccountStubFactory = (): CreateUserAccount => {
    class CreateAccountStub implements CreateUserAccount {
        create = async (account: CreateAccount): Promise<Either<CreateUserAccountError, User>> => {
            const createUser: Either<any, any> = User.create({
                name: 'Any Name',
                email: 'any@name.com.br',
                password: 'P4ssw0rd@Valid'
            })
            return await Promise.resolve(createUser)
        }
    }
    return new CreateAccountStub()
}

interface TypeSut {
    createAccountStub: CreateUserAccount
    sut: CreateAccountController
}

const makeSutFactory = (): TypeSut => {
    const createAccountStub = makeCreateAccountStubFactory()
    const sut = new CreateAccountController(createAccountStub)
    return { sut, createAccountStub }
}

describe('CreateAccountController', () => {
    test('should return statusCode 201 when create with success', async () => {
        const { sut, createAccountStub } = makeSutFactory()
        const createUser: Either<any, any> = User.create({
            name: 'Any Name',
            email: 'any@email.com.br',
            password: 'PasswordValid'
        })

        jest.spyOn(createAccountStub, 'create')
            .mockReturnValueOnce(Promise.resolve(createUser))

        const response = await sut.handle({
            body: {
                name: 'Any Name',
                email: 'any@email.com.br',
                password: 'PasswordValid'
            }
        })

        expect(response).toEqual({
            statusCode: 201,
            body: {
                name: 'Any Name',
                email: 'any@email.com.br'
            }
        })
    })

    test('should return statusCode 500 when not create', async () => {
        const { sut, createAccountStub } = makeSutFactory()
        const error = failure<any, any>(new CreateUserAccountError(new Error('Any message')))
        jest.spyOn(createAccountStub, 'create')
            .mockReturnValueOnce(Promise.resolve(error))

        const response = await sut.handle({
            body: {
                name: 'Any Name',
                email: 'any@email.com.br',
                password: 'PasswordValid'
            }
        })

        expect(response).toEqual(internalServerError(error.value))
    })

    test('should return statusCode 422 when params name is undefined', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.handle({
            body: { email: 'any@email.com.br', password: 'PasswordValid' }
        })
        expect(response).toEqual(unProcessableEntity(new MissingParamError('name')))
    })

    test('should return statusCode 422 when params name is invalid', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.handle({
            body: { name: 'in', email: 'any@email.com.br', password: 'PasswordValid' }
        })
        expect(response).toEqual(unProcessableEntity(new MissingParamError('name')))
    })

    test('should return statusCode 422 when params email is undefined', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.handle({
            body: { name: 'Any Name', password: 'PasswordValid' }
        })
        expect(response).toEqual(unProcessableEntity(new MissingParamError('email')))
    })

    test('should return statusCode 422 when params email is invalid', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.handle({
            body: { name: 'Any Name', email: 'valid-invalid', password: 'PasswordValid' }
        })
        expect(response).toEqual(unProcessableEntity(new MissingParamError('email')))
    })

    test('should return statusCode 422 when params password is undefined', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.handle({
            body: { name: 'Any Name', email: 'valid@email.com' }
        })
        expect(response).toEqual(unProcessableEntity(new MissingParamError('password')))
    })

    test('should return statusCode 422 when params password is invalid', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.handle({
            body: { name: 'Any Name', email: 'valid@email.com', password: 'invalid' }
        })

        expect(response).toEqual(unProcessableEntity(new MissingParamError('password')))
    })
})
