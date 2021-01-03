import { NotFoundError } from '@/domain/errors'
import { Book } from '@/domain/model/Book'
import { Either } from '@/shared/Either'
import { DatabaseInternalError } from '@/data/error'

export interface GetAllBooksByOwnerIdRepository {
    getByOwnerId: (id: string) => Promise<Either<NotFoundError | DatabaseInternalError, Book[]>>
}
