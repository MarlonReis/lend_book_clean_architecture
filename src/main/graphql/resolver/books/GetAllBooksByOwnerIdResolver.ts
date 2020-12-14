import { Arg, Query, Resolver } from 'type-graphql'
import { makeGetAllBooksByOwnerIdControllerFactory } from '../../../factories/GetAllBooksByOwnerId'
import { BooksOwnerResponse } from '../../schema/book/BooksOwnerResponse'

@Resolver()
export class GetAllBooksByOwnerIdResolver {
    @Query(() => [BooksOwnerResponse])
    async getGetAllBooksByOwnerId (@Arg('id') id: string) {
        const controller = makeGetAllBooksByOwnerIdControllerFactory()
        const response = await controller.handle({ params: { id } })
        return await Promise.resolve(response.body)
    }
}
