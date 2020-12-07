import { GetAllBooksByOwnerId } from '../../domain/usecase/GetAllBooksByOwnerId'
import { badRequest, internalServerError } from '../helper/HttpResponseHelper'
import { Controller } from '../protocol/Controller'
import { HttpRequest, HttpResponse } from '../protocol/Http'

export class GetAllBooksByOwnerIdController implements Controller {
    private readonly getAllBooksByOwnerId: GetAllBooksByOwnerId

    constructor (getAllBooksByOwnerId: GetAllBooksByOwnerId) {
        this.getAllBooksByOwnerId = getAllBooksByOwnerId
    }

    handle = async (request: HttpRequest): Promise<HttpResponse> => {
        const { id } = request.params

        if (!id) {
            return badRequest(new Error("params 'id' required!"))
        }

        const response = await this.getAllBooksByOwnerId.getByOwnerId(id)
        if (response.isFailure()) {
            if (!response.value.name.endsWith('NotFoundError')) {
                return internalServerError(response.value)
            }
            return ({ statusCode: 404, body: response.value })
        }

        return ({
            statusCode: 200,
            body: response.value
        })
    }
}
