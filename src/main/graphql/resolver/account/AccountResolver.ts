import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { Controller } from '../../../../presentation/protocol/Controller'
import { makeCreateUserAccountControllerFactory } from '../../../factories/CreateUserAccount'
import { AccountResponse } from '../../schema/account/AccountResponse'
import { CreateAccountInput } from './CreateAccountInput'

@Resolver()
export class AccountResolver {
    @Mutation(() => AccountResponse)
    async createUserAccount (@Arg('account') account: CreateAccountInput) {
        console.log(account)

        const controller: Controller = makeCreateUserAccountControllerFactory()
        const response = await controller.handle({
            body: {
                name: account.name, email: account.email, password: account.password
            }
        })
        const body = response.body
        return await Promise.resolve({
            name: body.name,
            email: body.email
        })
    }

    @Query(returns => String)
    account () {
        return 'OK'
    }
}
