import { DbGetAllBooksByOwnerId } from '../../data/usecase/DbGetAllBooksByOwnerId'
import { ConnectionDatabaseMongoDb } from '../../infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'
import { GetAllBooksByOwnerIdMongoRepository } from '../../infrastructure/database/mongodb/repositories/GetAllBooksByOwnerIdMongoRepository'
import { GetAllBooksByOwnerIdController } from '../../presentation/controller/GetAllBooksByOwnerIdController'
import { Controller } from '../../presentation/protocol/Controller'
import { LogControllerDecorator } from './LogControllerDecorator'

const makeDbGetAllBooksByOwnerIdFactory = (): DbGetAllBooksByOwnerId => {
    const connection = ConnectionDatabaseMongoDb.getInstance()
    const repository = new GetAllBooksByOwnerIdMongoRepository(connection)
    return new DbGetAllBooksByOwnerId(repository)
}

export const makeGetAllBooksByOwnerIdControllerFactory = (): Controller => {
    const getAllBooksByOwnerId = makeDbGetAllBooksByOwnerIdFactory()
    const controller = new GetAllBooksByOwnerIdController(getAllBooksByOwnerId)
    return new LogControllerDecorator(controller)
}
