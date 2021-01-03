import { Router } from 'express'
import { makeCreateUserAccountControllerFactory } from '@/main/factories/CreateUserAccount'
import { expressAdapter } from '@/main/express/adapter/ExpressAdapter'

export default (router: Router): void => {
    const factory = makeCreateUserAccountControllerFactory()
    const request = expressAdapter(factory)
    router.post('/create-account', request)
}
