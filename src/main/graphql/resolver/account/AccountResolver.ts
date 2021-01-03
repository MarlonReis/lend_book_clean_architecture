import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Controller } from '@/presentation/protocol/Controller'
import { makeCreateUserAccountControllerFactory } from '@/main/factories/CreateUserAccount'
import { AccountResponse } from '@/main/graphql/schema/account/AccountResponse'
import { CreateAccountInput } from './CreateAccountInput'

@Resolver()
export class AccountResolver {
    @Mutation(() => AccountResponse)
    async createUserAccount (@Arg('account') account: CreateAccountInput) {
        const controller: Controller = makeCreateUserAccountControllerFactory()
        const response = await controller.handle({ body: account })
        const body = response.body
        return await Promise.resolve({
            name: body.name,
            email: body.email
        })
    }

    @Query(() => AccountResponse)
    async getAccountByEmailAndPassword (
        @Arg('email') email: string,
        @Arg('password') password: string) {
        return await Promise.resolve({
            name: 'Any Name',
            email: 'any@email.com'
        })
    }
}
