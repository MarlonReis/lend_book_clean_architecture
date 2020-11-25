import { Router } from 'express'
import { makeCreateUserAccountControllerFactory } from '../../factories/CreateUserAccount'
import { expressAdapter } from '../adapter/ExpressAdapter'

export default (router: Router): void => {
    const factory = makeCreateUserAccountControllerFactory()
    const request = expressAdapter(factory)
    router.post('/create-account', request)
}
