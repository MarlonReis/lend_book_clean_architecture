import 'reflect-metadata'

import { createTestClient } from 'apollo-server-testing'
import { ApolloServerBase } from 'apollo-server-core'
import { createGraphqlSchema } from '../../../src/main/graphql/config/App'
import { ConnectionDatabaseMongoDb } from '../../../src/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'

const apolloServerBase = async () => {
    const schema = await createGraphqlSchema()
    return new ApolloServerBase({
        schema
    })
}

const connection = ConnectionDatabaseMongoDb.getInstance()

describe('CreateUserAccount', () => {
    let runMutate: any

    beforeAll(async () => await connection.open(process.env.MONGO_URL))
    afterAll(async () => await connection.close())

    beforeEach(async () => {
        const server = await apolloServerBase()
        const { mutate } = createTestClient(server)
        runMutate = mutate
    })

    test('should create a new account', async () => {
        const mutation = `
        mutation create($name: String!, $email: String!, $password: String!) {
            createUserAccount(account:{
                name:$name,
                email:$email,
                password:$password
            }){
              name email
            }
          }
        `

        const response = await runMutate({
            mutation,
            variables: {
                name: 'Any Name',
                email: 'email@hotmail.com',
                password: 'StR0NG@534534'
            }
        })
        const data = response.data.createUserAccount

        expect(data).toEqual({
            name: 'Any Name',
            email: 'email@hotmail.com'
        })
    })
})
