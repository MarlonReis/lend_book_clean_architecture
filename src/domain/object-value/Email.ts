import { Either, failure, success } from '../../shared/Either'
import InvalidEmailError from '../errors/InvalidEmailError'

const regexValidEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default class Email {
    private readonly _value: string

    private constructor (email: string) {
        this._value = email
    }

    static create (email: string): Either<InvalidEmailError, Email> {
        if (regexValidEmail.test(email)) {
            return success(new Email(email))
        }
        return failure(new InvalidEmailError(email))
    }

    get value (): string {
        return this._value
    }
}
