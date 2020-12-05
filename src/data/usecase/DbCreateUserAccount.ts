import { CreateUserAccountError, InvalidParamError } from '../../domain/errors'
import { User } from '../../domain/model/User'
import { CreateAccount, CreateUserAccount } from '../../domain/usecase/CreateUserAccount'
import { Either, failure } from '../../shared/Either'
import { EncryptsPassword } from '../protocol/EncryptsPassword'
import { CreateUserAccountRepository } from '../repositories/CreateUserAccountRepository'

export class DbCreateUserAccount implements CreateUserAccount {
    private readonly encryptsPassword: EncryptsPassword
    private readonly repository: CreateUserAccountRepository

    constructor (
        encryptsPassword: EncryptsPassword,
        repository: CreateUserAccountRepository
    ) {
        this.encryptsPassword = encryptsPassword
        this.repository = repository
    }

    async create (account: CreateAccount): Promise<Either<CreateUserAccountError, User>> {
        if ((!account.password || !(/.{8,64}/.test(account.password)))) {
            const error = new InvalidParamError('password', account.password)
            return failure(new CreateUserAccountError(error))
        }

        const passwordEncrypted = await this.encryptsPassword.encrypt(account.password)

        if (passwordEncrypted.isFailure()) {
            return failure(new CreateUserAccountError(passwordEncrypted.value))
        }

        const password: string = passwordEncrypted.value

        const response = User.create({
            name: account.name,
            email: account.email,
            password: password
        })

        if (response.isFailure()) {
            return failure(new CreateUserAccountError(response.value))
        }

        return await this.repository.create(response.value)
    }
}
