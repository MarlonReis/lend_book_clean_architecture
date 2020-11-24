import { CreateUserAccountError } from '../../domain/errors'
import { User } from '../../domain/model/user/User'
import { Password } from '../../domain/object-value'
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
        const passwordOrError = Password.create(account.password)

        if (passwordOrError.isFailure()) {
            return failure(new CreateUserAccountError(passwordOrError.value))
        }

        const passwordEncrypted = await this.encryptsPassword.encrypt(passwordOrError.value)

        if (passwordEncrypted.isFailure()) {
            return failure(new CreateUserAccountError(passwordEncrypted.value))
        }

        const password: Password = passwordEncrypted.value

        const response = User.create({
            name: account.name,
            email: account.email,
            password: password.value
        })

        if (response.isFailure()) {
            return failure(new CreateUserAccountError(response.value))
        }

        return await this.repository.create(response.value)
    }
}
