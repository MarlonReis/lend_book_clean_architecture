import { Either, failure, success } from '@/shared/Either'
import { InvalidParamError } from '@/domain/errors'

const emailValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const isInvalid = {
    name: (value: string): boolean => (!value || !(/.{3,}/.test(value))),
    email: (value: string): boolean => (!value || !emailValid.test(value)),
    password: (value: string): boolean => (!value || !(/.{8,64}/.test(value)))
}

const fields = ['name', 'email', 'password']

export class User {
    public readonly id: string
    public readonly name: string
    public readonly email: string
    public readonly password: string

    private constructor (id: string, name: string, email: string, password: string) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        Object.freeze(this)
    }

    static create (data: any): Either<InvalidParamError, User> {
        for (const field of fields) {
            const value = data[field]
            if (isInvalid[field](value)) {
                return failure(new InvalidParamError(field, value))
            }
        }
        return success(new User(data.id, data.name, data.email, data.password))
    }
}
