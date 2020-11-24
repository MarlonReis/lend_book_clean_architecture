import { Collection } from 'mongodb'
import { ConnectionDatabaseMongoDb } from '../../../../../src/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'

describe('ConnectionDatabaseMongoDb', () => {
    beforeAll(async () => await ConnectionDatabaseMongoDb.getInstance().open(process.env.MONGO_URL))
    afterAll(async () => await ConnectionDatabaseMongoDb.getInstance().close())

    test('should be open connection with database in memory', async () => {
        expect(ConnectionDatabaseMongoDb.getInstance().isConnected()).toBe(true)
    })

    test('should get collection by name', async () => {
        const collection: Collection = await ConnectionDatabaseMongoDb.getInstance().getCollectionByName('account')
        expect(collection).toBeTruthy()
        expect(collection.collectionName).toBe('account')
    })

    test('should get collection by name after reconnect when connection is close', async () => {
        const collection: Collection = await ConnectionDatabaseMongoDb.getInstance().getCollectionByName('account')
        expect(collection).toBeTruthy()
        await ConnectionDatabaseMongoDb.getInstance().close()

        const collectionAfterReconnect: Collection = await ConnectionDatabaseMongoDb.getInstance().getCollectionByName('account')

        expect(collectionAfterReconnect).toBeTruthy()
        expect(collectionAfterReconnect.collectionName).toBe('account')
    })

    test('should isConnected return false when not have connection ', async () => {
        await ConnectionDatabaseMongoDb.getInstance().close()
        expect(ConnectionDatabaseMongoDb.getInstance().isConnected()).toBe(false)
    })
    test('should isConnected return true when have connection ', async () => {
        await ConnectionDatabaseMongoDb.getInstance().open(process.env.MONGO_URL)
        expect(ConnectionDatabaseMongoDb.getInstance().isConnected()).toBe(true)
    })
})
