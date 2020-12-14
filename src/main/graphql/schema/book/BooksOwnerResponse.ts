import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class BooksOwnerResponse {
    @Field()
    id: string

    @Field()
    title: string
}
