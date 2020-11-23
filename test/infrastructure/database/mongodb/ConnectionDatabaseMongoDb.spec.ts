import { Collection } from 'mongodb'
import { ConnectionDatabaseMongoDb } from '../../../../src/infrastructure/database/mongodb/ConnectionDatabaseMongoDb'

const connection = new ConnectionDatabaseMongoDb(process.env.MONGO_URL)

describe('ConnectionDatabaseMongoDb', () => {
    beforeAll(async () => await connection.open())
    afterAll(async () => await connection.close())

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

    test('should isConnected return false when not have connection ', async () => {
        await connection.close()
        expect(connection.isConnected()).toBe(false)
    })
    test('should isConnected return true when have connection ', async () => {
        await connection.open()
        expect(connection.isConnected()).toBe(true)
    })
})
