import { DatabaseInternalError } from '../../../../data/error'
import { GetAllBooksByOwnerIdRepository } from '../../../../data/repositories/GetAllBooksByOwnerIdRepository'
import { NotFoundError } from '../../../../domain/errors'
import { Book } from '../../../../domain/model/Book'
import { Either, failure, success } from '../../../../shared/Either'
import { ConnectionDatabaseMongoDb } from '../connection/ConnectionDatabaseMongoDb'

const responseMap = (response: any): Book[] =>
    response.map((book: any) => Book.create({
        id: book._id,
        title: book.title,
        ownerId: book.ownerId
    })).filter((book: any) => book.isSuccess())
        .map((book: any) => book.value)

export class GetAllBooksByOwnerIdMongoRepository implements GetAllBooksByOwnerIdRepository {
    private readonly mongoConnection: ConnectionDatabaseMongoDb

    constructor (mongoConnection: ConnectionDatabaseMongoDb) {
        this.mongoConnection = mongoConnection
    }

    getByOwnerId = async (id: string): Promise<Either<NotFoundError | DatabaseInternalError, Book[]>> => {
        try {
            const bookCollection = await this.mongoConnection.getCollectionByName('books')
            const response = await bookCollection.find({ ownerId: id }).toArray()
            const books: Book[] = responseMap(response)

            if (books.length > 0) return success(books)

            return failure(new NotFoundError(`Not found book(s) by owner id equals '${id}'`))
        } catch (err) {
            return failure(new DatabaseInternalError(err))
        }
    }
}
