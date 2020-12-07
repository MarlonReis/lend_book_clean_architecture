import { CreateUserAccount } from '../../domain/usecase/CreateUserAccount'
import { MissingParamError } from '../error/MissingParamError'
import { unProcessableEntity, internalServerError } from '../helper/HttpResponseHelper'
import { Controller } from '../protocol/Controller'
import { HttpRequest, HttpResponse } from '../protocol/Http'

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const fieldInvalid = {
    name: (value: string): boolean => {
        if (value && /.{3,}/.test(value)) {
            return false
        }
        return true
    },
    email: (value: string): boolean => {
        if (value && emailRegex.test(value)) {
            return false
        }
        return true
    },
    password: (value: string): boolean => {
        if (value && /.{8,}/.test(value)) {
            return false
        }
        return true
    }
}

export class CreateAccountController implements Controller {
    private readonly createAccount: CreateUserAccount

    constructor (createAccount: CreateUserAccount) {
        this.createAccount = createAccount
    }

    handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
        const requiredFields = ['name', 'email', 'password']

        for (const field of requiredFields) {
            const value = httpRequest.body[field]
            if (fieldInvalid[field](value)) {
                return unProcessableEntity(new MissingParamError(field))
            }
        }

        const response = await this.createAccount.create(httpRequest.body)
        if (response.isFailure()) {
            return internalServerError(response.value)
        }

        const { name, email }: any = response.value
        return ({ statusCode: 201, body: { name, email } })
    }
}
