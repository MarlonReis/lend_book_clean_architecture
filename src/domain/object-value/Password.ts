import { Either, failure, success } from '@/shared/Either'
import { InvalidPasswordError } from '@/domain/errors'

export class Password {
    public readonly value: string

    private constructor (password: string) {
        this.value = password
        Object.freeze(this)
    }

    static create (password: string): Either<InvalidPasswordError, Password> {
        if (password && /.{8,64}/.test(password)) {
            return success(new Password(password))
        }
        return failure(new InvalidPasswordError(password))
    }

    getValue (): string {
        return this.value
    }
}
