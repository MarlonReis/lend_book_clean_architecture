import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class Account {
    // @Field(type => ID)
    // id: string;

    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string
}
