import { CreateUserAccountRepository } from '../../../../data/repositories/CreateUserAccountRepository'
import { CreateUserAccountError } from '../../../../domain/errors'
import { User } from '../../../../domain/model/User'
import { Either, failure, success } from '../../../../shared/Either'
import { ConnectionDatabaseMongoDb } from '../connection/ConnectionDatabaseMongoDb'

const mapResponse = (collection: any): any => {
    const { _id, ...collectionWithoutId } = collection
    return { id: { value: _id }, ...collectionWithoutId }
}
export class CreateUserAccountMongoRepository implements CreateUserAccountRepository {
    private readonly mongoConnection: ConnectionDatabaseMongoDb

    constructor (mongoConnection: ConnectionDatabaseMongoDb) {
        this.mongoConnection = mongoConnection
    }

    create = async (user: User): Promise<Either<CreateUserAccountError, User>> => {
        try {
            const accountCollection = await this.mongoConnection.getCollectionByName('user_account')
            const response = await accountCollection.insertOne({
                name: user.name,
                email: user.email,
                password: user.password
            })
            return success(mapResponse(response.ops[0]))
        } catch (err) {
            return failure(new CreateUserAccountError(err))
        }
    }
}
