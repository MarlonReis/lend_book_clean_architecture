import 'reflect-metadata'
import { ApolloServer } from 'apollo-server-express'
import { buildSchema } from 'type-graphql'
import Express from 'express'
import { GraphQLSchema } from 'graphql'

import { AccountResolver } from '../resolver/account/AccountResolver'
import { GetAllBooksByOwnerIdResolver } from '../resolver/books/GetAllBooksByOwnerIdResolver'

const createSchema = async (): Promise<GraphQLSchema> => await buildSchema({
    resolvers: [AccountResolver, GetAllBooksByOwnerIdResolver]
})

export const createGraphqlSchema = async (): Promise<GraphQLSchema> => await createSchema()

export const app = async (): Promise<any> => {
    const schema = await createSchema()
    const server = new ApolloServer({ schema })
    const app = Express()
    server.applyMiddleware({ app })
    return app
}
