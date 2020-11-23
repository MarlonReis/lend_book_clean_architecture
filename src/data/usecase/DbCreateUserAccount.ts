import { CreateUserAccountError } from '../../domain/errors'
import { User } from '../../domain/model/user/User'
import { Name, Password } from '../../domain/object-value'
import Email from '../../domain/object-value/Email'
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
        const nameOrError = Name.create(account.name)
        const emailOrError = Email.create(account.email)
        const passwordOrError = Password.create(account.password)

        if (nameOrError.isFailure()) {
            return failure(new CreateUserAccountError(nameOrError.value))
        }

        if (emailOrError.isFailure()) {
            return failure(new CreateUserAccountError(emailOrError.value))
        }

        if (passwordOrError.isFailure()) {
            return failure(new CreateUserAccountError(passwordOrError.value))
        }

        const passwordEncrypted = await this.encryptsPassword.encrypt(passwordOrError.value)

        if (passwordEncrypted.isFailure()) {
            return failure(new CreateUserAccountError(passwordEncrypted.value))
        }

        const name: Name = nameOrError.value
        const email: Email = emailOrError.value
        const password: Password = passwordEncrypted.value

        const user = new User(name, email, password)
        return await this.repository.create(user)
    }
}
