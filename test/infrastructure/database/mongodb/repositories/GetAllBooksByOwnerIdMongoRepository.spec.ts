import { DatabaseInternalError } from '../../../../../src/data/error'
import { NotFoundError } from '../../../../../src/domain/errors'
import { ConnectionDatabaseMongoDb } from '../../../../../src/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'
import { GetAllBooksByOwnerIdMongoRepository } from '../../../../../src/infrastructure/database/mongodb/repositories/GetAllBooksByOwnerIdMongoRepository'

describe('GetAllBooksByOwnerIdMongoRepository', () => {
    beforeAll(async () => await ConnectionDatabaseMongoDb.getInstance().open(process.env.MONGO_URL))
    beforeEach(async () => await ConnectionDatabaseMongoDb.getInstance().close())

    test('should return failure when not found register', async () => {
        await ConnectionDatabaseMongoDb.getInstance().open(process.env.MONGO_URL)
        const sut = new GetAllBooksByOwnerIdMongoRepository(ConnectionDatabaseMongoDb.getInstance())
        const response = await sut.getByOwnerId('ownerId')
        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(NotFoundError)
        expect(response.value as NotFoundError).toMatchObject({
            message: 'Not found book(s) by owner id equals \'ownerId\'',
            name: 'NotFoundError'
        })
    })

    test('should return success when found book', async () => {
        await ConnectionDatabaseMongoDb.getInstance().open(process.env.MONGO_URL)

        const collection = await ConnectionDatabaseMongoDb.getInstance().getCollectionByName('books')
        await collection.insertOne({
            title: 'Any title',
            ownerId: '3baa191c-364e-11eb-adc1-0242ac120002'
        })
        const sut = new GetAllBooksByOwnerIdMongoRepository(ConnectionDatabaseMongoDb.getInstance())
        const response = await sut.getByOwnerId('3baa191c-364e-11eb-adc1-0242ac120002')
        expect(response.isSuccess()).toBe(true)

        expect(response.value).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Any title',
                    ownerId: '3baa191c-364e-11eb-adc1-0242ac120002'
                })
            ])
        )
    })

    test('should return failure when not have database connection', async () => {
        await ConnectionDatabaseMongoDb.getInstance().close()
        const sut = new GetAllBooksByOwnerIdMongoRepository(ConnectionDatabaseMongoDb.getInstance())
        const response = await sut.getByOwnerId('ownerId')

        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(DatabaseInternalError)
        expect(response.value as DatabaseInternalError).toMatchObject({
            message: expect.any(String),
            name: 'DatabaseInternalError'
        })
    })
})
