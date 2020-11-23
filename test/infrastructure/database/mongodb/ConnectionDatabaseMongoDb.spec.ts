import { ConnectionDatabaseMongoDb } from '../../../../src/infrastructure/database/mongodb/ConnectionDatabaseMongoDb'

const connection = new ConnectionDatabaseMongoDb(process.env.MONGO_URL)

describe('ConnectionDatabaseMongoDb', () => {
    beforeEach(async () => await connection.open())
    afterEach(async () => await connection.close())

    test('should be open connection with database in memory', async () => {
        expect(connection.isConnected()).toBe(true)
    })
})
