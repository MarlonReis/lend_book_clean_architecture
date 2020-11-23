import { Collection } from 'mongodb'
import { ConnectionDatabaseMongoDb } from '../../../../src/infrastructure/database/mongodb/ConnectionDatabaseMongoDb'

const connection = new ConnectionDatabaseMongoDb(process.env.MONGO_URL)

describe('ConnectionDatabaseMongoDb', () => {
    beforeEach(async () => await connection.open())
    afterEach(async () => await connection.close())

    test('should be open connection with database in memory', async () => {
        expect(connection.isConnected()).toBe(true)
    })

    test('should get collection by name', async () => {
        const collection: Collection = await connection.getCollectionByName('account')
        expect(collection).toBeTruthy()
        expect(collection.collectionName).toBe('account')
    })

    test('should get collection by name after reconnect when connection is close', async () => {
        const collection: Collection = await connection.getCollectionByName('account')
        expect(collection).toBeTruthy()
        await connection.close()

        const collectionAfterReconnect: Collection = await connection.getCollectionByName('account')

        expect(collectionAfterReconnect).toBeTruthy()
        expect(collectionAfterReconnect.collectionName).toBe('account')
    })
})
