import { NotFoundError } from '../../../src/domain/errors'
import { Book } from '../../../src/domain/model/Book'
import { GetAllBooksByOwnerId } from '../../../src/domain/usecase/GetAllBooksByOwnerId'
import { GetAllBooksByOwnerIdController } from '../../../src/presentation/controller/GetAllBooksByOwnerIdController'
import { internalServerError } from '../../../src/presentation/helper/HttpResponseHelper'
import { Controller } from '../../../src/presentation/protocol/Controller'
import { Either, failure, success } from '../../../src/shared/Either'

const makeGetAllBooksByOwnerIdFactory = (): GetAllBooksByOwnerId => {
    class GetAllBooksByOwnerIdStub implements GetAllBooksByOwnerId {
        async getByOwnerId (id: string): Promise<Either<NotFoundError, Book[]>> {
            const book = Book.create({
                id: '3baa191c-364e-11eb-adc1-0242ac120003',
                title: 'Any title',
                ownerId: '3baa191c-364e-11eb-adc1-0242ac120002'
            })
            return await Promise.resolve(success([book.value as Book]))
        }
    }
    return new GetAllBooksByOwnerIdStub()
}
interface TypeSut {
    sut: Controller
    getAllBooksByOwnerIdSut: GetAllBooksByOwnerId
}
const makeSutFactory = (): TypeSut => {
    const getAllBooksByOwnerIdSut = makeGetAllBooksByOwnerIdFactory()
    const sut = new GetAllBooksByOwnerIdController(getAllBooksByOwnerIdSut)
    return { sut, getAllBooksByOwnerIdSut }
}

describe('GetAllBooksByOwnerIdController', () => {
    test('should return success when found book', async () => {
        const { sut } = makeSutFactory()
        const response = await sut.handle({
            params: { id: 'valid-id' }
        })

        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Any title',
                    ownerId: '3baa191c-364e-11eb-adc1-0242ac120002'
                })
            ])
        )
    })

    test('should return failure when use case throws error', async () => {
        const { sut, getAllBooksByOwnerIdSut } = makeSutFactory()
        const error = failure<any, any>(new Error('Any message'))

        jest.spyOn(getAllBooksByOwnerIdSut, 'getByOwnerId')
            .mockReturnValueOnce(Promise.resolve(error))

        const response = await sut.handle({ params: { id: 'valid-id' } })
        expect(response).toEqual(internalServerError(error.value as Error))
    })

    test('should return failure when use case throws error', async () => {
        const { sut, getAllBooksByOwnerIdSut } = makeSutFactory()
        const error = failure<any, any>(new NotFoundError('Any message'))

        jest.spyOn(getAllBooksByOwnerIdSut, 'getByOwnerId')
            .mockReturnValueOnce(Promise.resolve(error))

        const response = await sut.handle({ params: { id: 'valid-id' } })

        expect(response).toEqual({
            statusCode: 404,
            body: new NotFoundError((error.value as Error).message)
        })
    })
})
