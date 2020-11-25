import { InternalServerError } from '../error/InternalServerError'
import { HttpResponse } from '../protocol/Http'

export const unProcessableEntity = (error: Error): HttpResponse => ({
    statusCode: 422,
    body: error
})

export const internalServerError = (): HttpResponse => ({
    statusCode: 500,
    body: new InternalServerError()
})
