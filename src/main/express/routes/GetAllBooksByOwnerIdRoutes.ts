import { Router } from 'express'
import { makeGetAllBooksByOwnerIdControllerFactory } from '../../factories/GetAllBooksByOwnerId'
import { expressAdapter } from '../adapter/ExpressAdapter'

export default (router: Router): void => {
    const factory = makeGetAllBooksByOwnerIdControllerFactory()
    const request = expressAdapter(factory)
    router.get('/books/owner/:id', request)
}
