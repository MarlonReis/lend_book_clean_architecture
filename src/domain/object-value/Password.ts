import { Either, failure, success } from '../../shared/Either'

export class Password {
    private readonly _value: string

    private constructor (password: string) {
        this._value = password
    }

    static create (password: string): Either<Error, Password> {
        if (password.length > 0) {
            return success(new Password(password))
        }
        return failure(new Error('Error'))
    }

    get value (): string {
        return this._value
    }
}
