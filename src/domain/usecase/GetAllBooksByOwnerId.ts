import { Either } from '../../shared/Either'
import { NotFoundError } from '../errors'
import { Book } from '../model/book/Book'
import { IdEntity } from '../object-value'

export interface GetAllBooksByOwnerId {
    getByOwnerId: (id: IdEntity) => Promise<Either<NotFoundError, Book[]>>
}
