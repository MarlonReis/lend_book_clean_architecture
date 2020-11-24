import { User } from '../../../../../src/domain/model/user/User'
import { ConnectionDatabaseMongoDb } from '../../../../../src/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'
import { CreateUserAccountMongoRepository } from '../../../../../src/infrastructure/database/mongodb/repositories/CreateUserAccountMongoRepository'

const connection = new ConnectionDatabaseMongoDb(process.env.MONGO_URL)
describe('CreateUserAccountMongoRepository', () => {
    beforeAll(async () => await connection.open())
    afterAll(async () => await connection.close())

    test('should create new user account', async () => {
        const repository = new CreateUserAccountMongoRepository(connection)

        const createUser = User.create({
            name: 'Any Name',
            email: 'valid@any-email.com',
            password: 'AnyValidPassword'
        })

        if (createUser.isFailure()) {
            fail("Shouldn't have come here")
        }

        const response = await repository.create(createUser.value)

        expect(response.isSuccess()).toBe(true)
        expect(response.value).toMatchObject({
            id: { value: expect.anything() },
            name: { value: 'Any Name' },
            email: { value: 'valid@any-email.com' },
            password: { value: expect.any(String) }
        })
    })
})
