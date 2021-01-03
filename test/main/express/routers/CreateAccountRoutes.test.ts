import request from 'supertest'
import app from '@/main/express/config/App'
import { ConnectionDatabaseMongoDb } from '@/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'

const connection = ConnectionDatabaseMongoDb.getInstance()

describe('Create account routers', () => {
    beforeAll(async () => {
        await connection.open(process.env.MONGO_URL)
    })

    beforeEach(async () => {
        const accountCollection = await connection.getCollectionByName('user_account')
        await accountCollection.deleteMany({})
    })

    afterAll(async () => {
        await connection.close()
    })

    test('should be return an account on success', async () => {
        await request(app).post('/api/create-account').send({
            name: 'Any Name',
            email: 'any@email.com.br',
            password: 'Any@Password'
        }).expect(201)
    })

    test('should be return statusCode 500 when not have connection of database', async () => {
        await connection.close()
        await request(app).post('/api/create-account').send({
            name: 'Any Name',
            email: 'any@email.com.br',
            password: 'Any@Password'
        })
            .expect('Content-Type', /json/)
            .expect(500, {
                error: 'InternalServerError',
                message: 'Internal server error'
            })
    })
})
