import { Router } from 'express'
import { makeGetAllBooksByOwnerIdControllerFactory } from '@/main/factories/GetAllBooksByOwnerId'
import { expressAdapter } from '@/main/express/adapter/ExpressAdapter'

export default (router: Router): void => {
    const factory = makeGetAllBooksByOwnerIdControllerFactory()
    const request = expressAdapter(factory)
    router.get('/books/owner/:id', request)
}
