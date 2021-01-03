import * as dotenv from 'dotenv'
dotenv.config()

export default {
    mongoUrl: process.env.MONGO_URL || process.env.URL_MONGO_DB,
    port: process.env.PORT || 8080
}
