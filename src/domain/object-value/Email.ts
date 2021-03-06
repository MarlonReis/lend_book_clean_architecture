import { Either, failure, success } from '@/shared/Either'
import { InvalidEmailError } from '@/domain/errors'

const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

export default class Email {
    public readonly value: string

    private constructor (email: string) {
        this.value = email
        Object.freeze(this)
    }

    static create (email: string): Either<InvalidEmailError, Email> {
        if (emailValid.test(email)) {
            return success(new Email(email))
        }
        return failure(new InvalidEmailError(email))
    }

    getValue (): string {
        return this.value
    }
}
