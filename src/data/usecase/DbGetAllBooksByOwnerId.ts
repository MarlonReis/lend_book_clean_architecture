import { NotFoundError } from '../../domain/errors'
import { Book } from '../../domain/model/book/Book'
import { IdEntity } from '../../domain/object-value'
import { GetAllBooksByOwnerId } from '../../domain/usecase/GetAllBooksByOwnerId'
import { Either } from '../../shared/Either'
import { GetAllBooksByOwnerIdRepository } from '../repositories/GetAllBooksByOwnerIdRepository'

export class DbGetAllBooksByOwnerId implements GetAllBooksByOwnerId {
    private readonly repository: GetAllBooksByOwnerIdRepository

    constructor (repository: GetAllBooksByOwnerIdRepository) {
        this.repository = repository
    }

    async getByOwnerId (id: IdEntity): Promise<Either<NotFoundError, Book[]>> {
        return await this.repository.getByOwnerId(id)
    }
}
