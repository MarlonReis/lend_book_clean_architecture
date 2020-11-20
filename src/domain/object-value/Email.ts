import { Either, success } from '../../shared/Either'

export default class Email {
    private readonly _value: string

    private constructor (email: string) {
        this._value = email
    }

    static create (email: string): Either<Error, Email> {
        if (email.length > 0) {
            return success(new Email(email))
        }
        return fail(new Error('Error'))
    }

    get value (): string {
        return this._value
    }
}
