import { Express } from 'express'
import { cors, bodyParser, contentType } from '@/main/express/middleware'

export default (app: Express): void => {
    app.use(bodyParser)
    app.use(cors)
    app.use(contentType)
}
