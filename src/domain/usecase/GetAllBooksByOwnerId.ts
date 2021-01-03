import { Either } from '@/shared/Either'
import { NotFoundError } from '@/domain/errors'
import { Book } from '@/domain/model/Book'

export interface GetAllBooksByOwnerId {
    getByOwnerId: (id: string) => Promise<Either<NotFoundError, Book[]>>
}
