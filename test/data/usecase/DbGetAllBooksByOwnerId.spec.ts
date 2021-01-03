import { GetAllBooksByOwnerIdRepository } from '@/data/repositories/GetAllBooksByOwnerIdRepository'
import { DbGetAllBooksByOwnerId } from '@/data/usecase/DbGetAllBooksByOwnerId'
import { NotFoundError } from '@/domain/errors'
import { Book } from '@/domain/model/Book'
import { Either, success, failure } from '@/shared/Either'

const makeRepository = (): GetAllBooksByOwnerIdRepository => {
    class GetAllBooksByOwnerIdRepositoryStub implements GetAllBooksByOwnerIdRepository {
        getByOwnerId = async (id: string): Promise<Either<NotFoundError, Book[]>> => {
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

interface TypeSut {
    sut: DbGetAllBooksByOwnerId
    repository: GetAllBooksByOwnerIdRepository
}

const makeSutFactory = (): TypeSut => {
    const repository = makeRepository()
    const sut = new DbGetAllBooksByOwnerId(repository)
    return { sut, repository }
}

describe('GetAllBooksByOwnerId', () => {
    test('should get all books by owner id', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.getByOwnerId('valid-id')

        expect(response.isSuccess()).toBe(true)
        expect(response.value).toBeInstanceOf(Array)
    })

    test('should return failure when repository return that not found', async () => {
        const { sut, repository } = makeSutFactory()

        jest.spyOn(repository, 'getByOwnerId').mockReturnValueOnce(
            Promise.resolve(failure(new NotFoundError('Any message'))))

        const response = await sut.getByOwnerId('valid-id')
        expect(response.isFailure()).toBe(true)
        expect(response.value as NotFoundError).toMatchObject({
            message: 'Any message',
            name: 'NotFoundError'
        })
    })
})
