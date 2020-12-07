import { Controller } from '../../../presentation/protocol/Controller'

import { Request, Response } from 'express'
import { HttpRequest, HttpResponse } from '../../../presentation/protocol/Http'

export const expressAdapter = (controller: Controller) => {
    return async (req: Request, res: Response): Promise<any> => {
        const { body, params } = req

        const request: HttpRequest = { body, params }
        const response: HttpResponse = await controller.handle(request)

        if (response.statusCode === 200 || response.statusCode === 201) {
            res.status(response.statusCode).json(response.body)
        } else {
            res.status(response.statusCode).json({
                error: response.body.name,
                message: response.body.message
            })
        }
    }
}
