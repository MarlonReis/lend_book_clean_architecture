import { InvalidTitleError } from '../../errors'
import { Either, failure, success } from '../../../shared/Either'
import { Title } from '../../object-value'
import { BookData } from './BookData'
import { User } from '../user/User'

export class Book {
    private readonly title: Title
    private readonly owner: User

    private constructor (title: Title, owner: User) {
        this.title = title
        this.owner = owner
        Object.freeze(this)
    }

    static create (data: BookData): Either<InvalidTitleError | Error, Book> {
        const titleOrError: Either<InvalidTitleError, Title> = Title.create(data.title)
        const ownerOrError: Either<Error, User> = User.create(data.owner)

        if (titleOrError.isFailure()) {
            return failure(titleOrError.value)
        }

        if (ownerOrError.isFailure()) {
            return failure(ownerOrError.value)
        }

        const title: Title = titleOrError.value
        const user: User = ownerOrError.value

        return success(new Book(title, user))
    }

    readonly getTitle = (): Title => {
        return this.title
    }

    readonly getOwner = (): User => {
        return this.owner
    }
}
