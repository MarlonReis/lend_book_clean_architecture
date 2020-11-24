import { Either, failure, success } from '../../../shared/Either'
import { InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../../errors'
import { IdEntity, Name, Password } from '../../object-value'
import Email from '../../object-value/Email'
import { UserData } from './UserData'
export class User {
    private readonly id: IdEntity
    private readonly name: Name
    private readonly email: Email
    private readonly password: Password

    private constructor (name: Name, email: Email, password: Password) {
        this.name = name
        this.email = email
        this.password = password
        Object.freeze(this)
    }

    static create (data: UserData): Either<InvalidNameError | InvalidEmailError | InvalidPasswordError, User> {
        const nameOrError = Name.create(data.name)
        const emailOrError = Email.create(data.email)
        const passwordOrError = Password.create(data.password)

        if (nameOrError.isFailure()) {
            return failure(nameOrError.value)
        }

        if (emailOrError.isFailure()) {
            return failure(emailOrError.value)
        }

        if (passwordOrError.isFailure()) {
            return failure(passwordOrError.value)
        }

        const name: Name = nameOrError.value
        const email: Email = emailOrError.value
        const password: Password = passwordOrError.value

        return success(new User(name, email, password))
    }

    readonly getIdEntity = (): IdEntity => {
        return this.id
    }

    readonly getName = (): Name => {
        return this.name
    }

    readonly getEmail = (): Email => {
        return this.email
    }

    readonly getPassword = (): Password => {
        return this.password
    }
}
