import { NotFoundError } from '../../domain/errors'
import { Book } from '../../domain/model/Book'
import { GetAllBooksByOwnerId } from '../../domain/usecase/GetAllBooksByOwnerId'
import { Either } from '../../shared/Either'
import { GetAllBooksByOwnerIdRepository } from '../repositories/GetAllBooksByOwnerIdRepository'

export class DbGetAllBooksByOwnerId implements GetAllBooksByOwnerId {
    private readonly repository: GetAllBooksByOwnerIdRepository

    constructor (repository: GetAllBooksByOwnerIdRepository) {
        this.repository = repository
    }

    async getByOwnerId (id: string): Promise<Either<NotFoundError, Book[]>> {
        return await this.repository.getByOwnerId(id)
    }
}
