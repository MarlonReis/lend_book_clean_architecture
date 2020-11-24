import { CreateUserAccountRepository } from '../../../../data/repositories/CreateUserAccountRepository'
import { CreateUserAccountError } from '../../../../domain/errors'
import { User } from '../../../../domain/model/user/User'
import { Either, success } from '../../../../shared/Either'
import { ConnectionDatabaseMongoDb } from '../connection/ConnectionDatabaseMongoDb'

export class CreateUserAccountMongoRepository implements CreateUserAccountRepository {
    private readonly mongoConnection: ConnectionDatabaseMongoDb

    constructor (mongoConnection: ConnectionDatabaseMongoDb) {
        this.mongoConnection = mongoConnection
    }

    create = async (user: User): Promise<Either<CreateUserAccountError, User>> => {
        const accountCollection = await this.mongoConnection.getCollectionByName('user_account')
        const response = await accountCollection.insertOne(
            {
                name: user.getName(),
                email: user.getEmail(),
                password: user.getPassword()
            }
        )

        return success(this.map(response.ops[0]))
    }

    private map (collection: any): any {
        const { _id, ...collectionWithoutId } = collection
        return { id: { value: _id }, ...collectionWithoutId }
    }
}
