import 'reflect-metadata'

import { app } from './config/App'
import config from '../config'
import { ConnectionDatabaseMongoDb } from '../../infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'

ConnectionDatabaseMongoDb.getInstance().open(config.mongoUrl)
    .then(async () => {
        const expressApp = await app()
        expressApp.listen(4000, () =>
            console.log('🚀 server started on http://localhost:4000/graphql')
        )
    }).catch(err => console.log(err.message))
