import { NotFoundError } from '../../../src/domain/errors'
import { Book } from '../../../src/domain/model/Book'
import { GetAllBooksByOwnerId } from '../../../src/domain/usecase/GetAllBooksByOwnerId'
import { GetAllBooksByOwnerIdController } from '../../../src/presentation/controller/GetAllBooksByOwnerIdController'
import { Either, success } from '../../../src/shared/Either'

describe('GetAllBooksByOwnerIdController', () => {
    test('should return success when found book', async () => {
        class GetAllBooksByOwnerIdSut implements GetAllBooksByOwnerId {
            async getByOwnerId (id: string): Promise<Either<NotFoundError, Book[]>> {
                const book = Book.create({
                    id: '3baa191c-364e-11eb-adc1-0242ac120003',
                    title: 'Any title',
                    ownerId: '3baa191c-364e-11eb-adc1-0242ac120002'
                })
                return await Promise.resolve(success([book.value as Book]))
            }
        }

        const getAllBooksByOwnerIdSut = new GetAllBooksByOwnerIdSut()
        const sut = new GetAllBooksByOwnerIdController(getAllBooksByOwnerIdSut)
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
})
