import { InvalidParamError } from '@/domain/errors'
import { Either, failure, success } from '@/shared/Either'

export class Book {
    public readonly id: string
    public readonly title: string
    public readonly ownerId: string

    private constructor (id: string, title: string, owner: string) {
        this.id = id
        this.title = title
        this.ownerId = owner
        Object.freeze(this)
    }

    static create (data: any): Either<InvalidParamError, Book> {
        if (!data.title || !(/.{3,50}/.test(data.title))) {
            return failure(new InvalidParamError('title', data.title))
        }

        if (!data.ownerId || !(/[0-9a-fA-F-]+[0-9a-fA-F]/.test(data.ownerId))) {
            return failure(new InvalidParamError('ownerId', data.ownerId))
        }

        return success(new Book(data.id, data.title, data.ownerId))
    }
}
