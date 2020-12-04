import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class AccountResponse {
    @Field()
    name: string

    @Field()
    email: string
}
