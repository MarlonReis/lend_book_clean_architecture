import { Collection, MongoClient } from 'mongodb'
import { ConnectionDatabase } from '../../../protocol/ConnectionDatabase'

export class ConnectionDatabaseMongoDb implements ConnectionDatabase {
    private readonly databaseUrl: string
    private mongoClient: MongoClient | undefined

    constructor (url: string) {
        this.databaseUrl = url
    }

    open = async (): Promise<void> => {
        this.mongoClient = await MongoClient.connect(this.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    }

    close = async (): Promise<void> => {
        if (this.isConnected()) {
            await this.mongoClient.close()
            this.mongoClient = undefined
        }
    }

    isConnected (): boolean {
        if (!this.mongoClient) {
            return false
        }
        return this.mongoClient.isConnected()
    }

    getCollectionByName = async (collectionName: string): Promise<Collection> => {
        if (!this.isConnected()) {
            await this.open()
        }
        return this.mongoClient.db().collection(collectionName)
    }
}
