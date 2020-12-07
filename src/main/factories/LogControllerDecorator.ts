import { Controller } from '../../presentation/protocol/Controller'
import { HttpRequest, HttpResponse } from '../../presentation/protocol/Http'

export class LogControllerDecorator implements Controller {
    private readonly controller: Controller

    constructor (controller: Controller) {
        this.controller = controller
    }

    handle = async (httpRequest: HttpRequest): Promise<HttpResponse> => {
        const response = await this.controller.handle(httpRequest)
        if (response.statusCode !== 200 && response.statusCode !== 201) {
            const { message, name, stack, cause } = response.body

            console.log('LogControllerDecorator', {
                status: response.statusCode,
                body: {
                    name,
                    message,
                    cause,
                    stack
                }
            })
        }
        return response
    }
}
