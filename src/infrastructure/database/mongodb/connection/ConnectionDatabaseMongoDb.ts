import { Collection, MongoClient } from 'mongodb'
import { ConnectionDatabase } from '../../../protocol/ConnectionDatabase'

export class ConnectionDatabaseMongoDb implements ConnectionDatabase {
    private static instance: ConnectionDatabaseMongoDb
    private mongoClient: MongoClient | undefined

    static getInstance (): ConnectionDatabaseMongoDb {
        if (!ConnectionDatabaseMongoDb.instance) {
            ConnectionDatabaseMongoDb.instance = new ConnectionDatabaseMongoDb()
        }
        return ConnectionDatabaseMongoDb.instance
    }

    private constructor () { }

    open = async (url: string): Promise<void> => {
        this.mongoClient = await MongoClient.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    close = async (): Promise<void> => {
        await this.mongoClient.close()
    }

    isConnected (): boolean {
        if (!this.mongoClient) {
            return false
        }
        return this.mongoClient.isConnected()
    }

    getCollectionByName = async (collectionName: string): Promise<Collection> => {
        return this.mongoClient.db().collection(collectionName)
    }
}
