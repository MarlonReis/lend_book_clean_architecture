import { InternalServerError } from '@/presentation/error/InternalServerError'
import { HttpResponse } from '@/presentation/protocol/Http'

export const unProcessableEntity = (error: Error): HttpResponse => ({
    statusCode: 422,
    body: error
})

export const internalServerError = (causeError: Error): HttpResponse => ({
    statusCode: 500,
    body: new InternalServerError(causeError)
})
