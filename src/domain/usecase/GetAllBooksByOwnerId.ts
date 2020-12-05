import { Either } from '../../shared/Either'
import { NotFoundError } from '../errors'
import { Book } from '../model/Book'

export interface GetAllBooksByOwnerId {
    getByOwnerId: (id: string) => Promise<Either<NotFoundError, Book[]>>
}
