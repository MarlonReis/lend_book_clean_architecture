import { CreateUserAccountError } from '../../../../../src/domain/errors'
import { User } from '../../../../../src/domain/model/User'
import { ConnectionDatabaseMongoDb } from '../../../../../src/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'
import { CreateUserAccountMongoRepository } from '../../../../../src/infrastructure/database/mongodb/repositories/CreateUserAccountMongoRepository'

describe('CreateUserAccountMongoRepository', () => {
    beforeAll(async () => await ConnectionDatabaseMongoDb.getInstance().open(process.env.MONGO_URL))
    afterAll(async () => await ConnectionDatabaseMongoDb.getInstance().close())

    test('should create new user account', async () => {
        const repository = new CreateUserAccountMongoRepository(ConnectionDatabaseMongoDb.getInstance())

        const createUser = User.create({
            name: 'Any Name',
            email: 'valid@any-email.com',
            password: 'AnyValidPassword'
        })

        const response = await repository.create(createUser.value as User)
        expect(response.isSuccess()).toBe(true)
        expect(response.value).toMatchObject({
            id: expect.anything(),
            name: 'Any Name',
            email: 'valid@any-email.com',
            password: expect.any(String)
        })
    })

    test('should return error when not have connection of database', async () => {
        await ConnectionDatabaseMongoDb.getInstance().close()
        const repository = new CreateUserAccountMongoRepository(ConnectionDatabaseMongoDb.getInstance())

        const createUser = User.create({
            name: 'Any Name',
            email: 'valid@any-email.com',
            password: 'AnyValidPassword'
        })

        const response = await repository.create(createUser.value as User)
        expect(response.isFailure()).toBe(true)
        expect(response.value).toBeInstanceOf(CreateUserAccountError)
    })
})
