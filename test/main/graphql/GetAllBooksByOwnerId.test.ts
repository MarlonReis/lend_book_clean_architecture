import { createTestClient } from 'apollo-server-testing'
import { ApolloServerBase } from 'apollo-server-core'
import { createGraphqlSchema } from '../../../src/main/graphql/config/App'
import { ConnectionDatabaseMongoDb } from '../../../src/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'

const queryGetAllBooksByOwnerId = `
    query getByOwnerId($ownerId: String!){
        books:getGetAllBooksByOwnerId(id:$ownerId){
            id 
            title
        }
    }
`

const apolloServerBase = async () => {
    const schema = await createGraphqlSchema()
    return new ApolloServerBase({ schema })
}

const connection = ConnectionDatabaseMongoDb.getInstance()

describe('GetAllBooksByOwnerId', () => {
    let runQuery: any

    beforeAll(async () => {
        await connection.open(process.env.MONGO_URL)

        const collection = await connection.getCollectionByName('books')
        await collection.insertOne({
            title: 'Any title',
            ownerId: '3baa191c-364e-11eb-adc1-0242ac120002'
        })
    })

    afterAll(async () => await connection.close())

    beforeEach(async () => {
        const server = await apolloServerBase()
        const { query } = createTestClient(server)
        runQuery = query
    })

    test('should return all books', async () => {
        const response = await runQuery({
            query: queryGetAllBooksByOwnerId,
            variables: {
                ownerId: '3baa191c-364e-11eb-adc1-0242ac120002'
            }
        })

        expect(response.data.books).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(String),
                title: 'Any title'
            })
        ]))
    })

    test('should return message error when not found by id', async () => {
        const response = await runQuery({
            query: queryGetAllBooksByOwnerId,
            variables: {
                ownerId: '3baa191c-364e-11eb-adc1-0242ac128702'
            }
        })

        expect(response.errors).toEqual(expect.arrayContaining([
            expect.objectContaining({
                message: "Not found book(s) by owner id equals '3baa191c-364e-11eb-adc1-0242ac128702'"
            })
        ]))
    })
})
