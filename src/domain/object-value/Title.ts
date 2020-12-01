import { Either, failure, success } from '../../shared/Either'
import { InvalidTitleError } from '../errors/InvalidTitleError'

export class Title {
    private readonly value: string

    private constructor (title: string) {
        this.value = title
        Object.freeze(this)
    }

    static create (title: string): Either<InvalidTitleError, Title> {
        if (title && /.{3,50}/.test(title)) {
            return success(new Title(title))
        }
        return failure(new InvalidTitleError(title))
    }

    getValue (): string {
        return this.value
    }
}
