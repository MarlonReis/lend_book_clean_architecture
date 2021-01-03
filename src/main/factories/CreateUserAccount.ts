import { DbCreateUserAccount } from '@/data/usecase/DbCreateUserAccount'
import { BCryptEncryptsPasswordAdapter } from '@/infrastructure/adapter/BCryptEncryptsPasswordAdapter'
import { ConnectionDatabaseMongoDb } from '@/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'
import { CreateUserAccountMongoRepository } from '@/infrastructure/database/mongodb/repositories/CreateUserAccountMongoRepository'
import { CreateAccountController } from '@/presentation/controller/CreateAccountController'
import { Controller } from '@/presentation/protocol/Controller'
import { LogControllerDecorator } from './LogControllerDecorator'

const makeDbCreateUserAccountFactory = (): DbCreateUserAccount => {
    const salt = 12
    const bcrypt = new BCryptEncryptsPasswordAdapter(salt)
    const connection = ConnectionDatabaseMongoDb.getInstance()
    const repository = new CreateUserAccountMongoRepository(connection)
    return new DbCreateUserAccount(bcrypt, repository)
}

export const makeCreateUserAccountControllerFactory = (): Controller => {
    const createUserAccount = makeDbCreateUserAccountFactory()
    const controller = new CreateAccountController(createUserAccount)
    return new LogControllerDecorator(controller)
}
