import { Either, failure, success } from '../../shared/Either'
import { InvalidPasswordError } from '../errors'

export class Password {
    private readonly _value: string

    private constructor (password: string) {
        this._value = password
    }

    static create (password: string): Either<Error, Password> {
        if (/.{8,64}/.test(password)) {
            return success(new Password(password))
        }
        return failure(new InvalidPasswordError(password))
    }

    get value (): string {
        return this._value
    }
}
