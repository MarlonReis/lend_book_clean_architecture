import { NotFoundError } from '../../domain/errors'
import { Book } from '../../domain/model/book/Book'
import { IdEntity } from '../../domain/object-value'
import { Either } from '../../shared/Either'

export interface GetAllBooksByOwnerIdRepository {
    getByOwnerId: (id: IdEntity) => Promise<Either<NotFoundError, Book[]>>
}
