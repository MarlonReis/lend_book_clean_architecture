import { Field, InputType } from 'type-graphql'

@InputType()
export abstract class CreateAccountInput {
    @Field()
    name: string

    @Field()
    email: string

    @Field()
    password: string
}
