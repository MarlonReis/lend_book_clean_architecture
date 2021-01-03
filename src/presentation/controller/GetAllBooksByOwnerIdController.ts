import { GetAllBooksByOwnerId } from '@/domain/usecase/GetAllBooksByOwnerId'
import { internalServerError } from '@/presentation/helper/HttpResponseHelper'
import { Controller } from '@/presentation/protocol/Controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocol/Http'

export class GetAllBooksByOwnerIdController implements Controller {
    private readonly getAllBooksByOwnerId: GetAllBooksByOwnerId

    constructor (getAllBooksByOwnerId: GetAllBooksByOwnerId) {
        this.getAllBooksByOwnerId = getAllBooksByOwnerId
    }

    handle = async (request: HttpRequest): Promise<HttpResponse> => {
        const { id } = request.params

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
