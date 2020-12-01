import { GetAllBooksByOwnerIdRepository } from '../../../src/data/repositories/GetAllBooksByOwnerIdRepository'
import { DbGetAllBooksByOwnerId } from '../../../src/data/usecase/DbGetAllBooksByOwnerId'
import { NotFoundError } from '../../../src/domain/errors'
import { Book } from '../../../src/domain/model/book/Book'
import { IdEntity } from '../../../src/domain/object-value'
import { Either, success } from '../../../src/shared/Either'

const makeRepository = (): GetAllBooksByOwnerIdRepository => {
    class GetAllBooksByOwnerIdRepositoryStub implements GetAllBooksByOwnerIdRepository {
        getByOwnerId = async (id: IdEntity): Promise<Either<NotFoundError, Book[]>> => {
            const bookOrError = Book.create({
                title: 'Any Title',
                owner: {
                    email: 'any@email.com.br',
                    name: 'Any Name',
                    password: 'Password@Valid'
                }
            })
            return await Promise.resolve(success([bookOrError.value as Book]))
        }
    }
    return new GetAllBooksByOwnerIdRepositoryStub()
}

describe('GetAllBooksByOwnerId', () => {
    test('should get all books by owner id', async () => {
        const repository = makeRepository()
        const sut = new DbGetAllBooksByOwnerId(repository)
        const id = IdEntity.create('valid-id').value as IdEntity
        const response = await sut.getByOwnerId(id)

        expect(response.isSuccess()).toBe(true)
        expect(response.value).toBeInstanceOf(Array)
    })
})
