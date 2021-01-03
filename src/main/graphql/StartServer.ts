import 'module-alias/register'
import 'reflect-metadata'

import { app } from './config/App'
import config from '@/main/config'
import { ConnectionDatabaseMongoDb } from '@/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'

ConnectionDatabaseMongoDb.getInstance().open(config.mongoUrl)
    .then(async () => {
        const expressApp = await app()
        expressApp.listen(4004, () =>
            console.log('🚀 server started on http://localhost:4004/graphql')
        )
    }).catch(err => console.log(err.message))
