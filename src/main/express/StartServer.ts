import app from './config/App'
import { ConnectionDatabaseMongoDb } from '../../infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'
import config from '../config'

ConnectionDatabaseMongoDb.getInstance().open(config.mongoUrl)
    .then(() => {
        app.listen(config.port, () => console.log(`Server running at http://localhost:${config.port}`))
    }).catch(err => console.log(err.message))
