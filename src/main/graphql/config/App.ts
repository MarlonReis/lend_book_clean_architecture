import 'reflect-metadata'
// import core from 'express-serve-static-core'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import Express from 'express'
import { AccountResolver } from '../resolver/account/AccountResolver'
import { GraphQLSchema } from 'graphql'

const createSchema = async (): Promise<GraphQLSchema> => await buildSchema({
    resolvers: [AccountResolver]
})

export const createGraphqlSchema = async (): Promise<GraphQLSchema> => await createSchema()

export const app = async (): Promise<any> => {
    const schema = await createSchema()
    const server = new ApolloServer({ schema })
    const app = Express()
    server.applyMiddleware({ app })
    return app
}
