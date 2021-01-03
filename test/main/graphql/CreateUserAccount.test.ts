import 'reflect-metadata'

import { createTestClient } from 'apollo-server-testing'
import { ApolloServerBase } from 'apollo-server-core'
import { createGraphqlSchema, app } from '@/main/graphql/config/App'
import { ConnectionDatabaseMongoDb } from '@/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'

const mutationCreateAccount = `
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
const queryGetAccountByEmailAndPassword = `
    query account($email: String!, $password:String!){
        account:getAccountByEmailAndPassword(password:$password,email: $email){
            name email
        }
    }
`

const apolloServerBase = async () => {
    const schema = await createGraphqlSchema()
    return new ApolloServerBase({ schema })
}

const connection = ConnectionDatabaseMongoDb.getInstance()

describe('CreateUserAccount', () => {
    let runMutate: any
    let runQuery: any

    beforeAll(async () => await connection.open(process.env.MONGO_URL))
    afterAll(async () => await connection.close())

    beforeEach(async () => {
        const server = await apolloServerBase()
        const { mutate, query } = createTestClient(server)
        runMutate = mutate
        runQuery = query
    })

    test('should define app', async () => {
        const application = await app()
        expect(application).toBeTruthy()
    })

    test('should create a new account', async () => {
        const response = await runMutate({
            mutation: mutationCreateAccount,
            variables: {
                name: 'Any Name',
                email: 'email@hotmail.com',
                password: 'StR0NG@534534'
            }
        })
        expect(response.data.createUserAccount).toEqual({
            name: 'Any Name',
            email: 'email@hotmail.com'
        })
    })

    test('should return error when email is invalid', async () => {
        const response = await runMutate({
            mutation: mutationCreateAccount,
            variables: {
                name: 'Any Name',
                email: 'email-valid.com',
                password: 'StR0NG@534534'
            }
        })
        expect(response.errors).toBeTruthy()
        expect(response.data).toBeNull()
    })

    test('should throws error when connection database is closed', async () => {
        await connection.close()
        const response = await runMutate({
            mutation: mutationCreateAccount,
            variables: {
                name: 'Any Name',
                email: 'email@valid.com',
                password: 'StR0NG@534534'
            }
        })
        expect(response.errors).toBeTruthy()
        expect(response.data).toBeNull()
    })

    test('should get account by email and password', async () => {
        const response = await runQuery({
            query: queryGetAccountByEmailAndPassword,
            variables: {
                name: 'Any Name',
                email: 'email@valid.com',
                password: 'StR0NG@534534'
            }
        })
        expect(response.data.account).toEqual({
            name: 'Any Name',
            email: 'any@email.com'
        })
    })
})
