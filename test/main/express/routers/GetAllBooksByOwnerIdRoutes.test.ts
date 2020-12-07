import request from 'supertest'
import app from '../../../../src/main/express/config/App'
import { ConnectionDatabaseMongoDb } from '../../../../src/infrastructure/database/mongodb/connection/ConnectionDatabaseMongoDb'

const connection = ConnectionDatabaseMongoDb.getInstance()
let booksCollection

describe('GetAllBooksByOwnerIdRoutes', () => {
    beforeAll(async () => {
        await connection.open(process.env.MONGO_URL)
    })

    beforeEach(async () => {
        booksCollection = await connection.getCollectionByName('books')
        await booksCollection.deleteMany({})
    })

    afterAll(async () => {
        await connection.close()
    })

    test('should return book when found by owner id', async () => {
        const ownerId: string = '3baa191c-364e-11eb-adc1-0242ac120002'
        await booksCollection.insertOne({
            title: 'Any title',
            ownerId
        })

        await request(app).get(`/api/books/owner/${ownerId}`)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).then(res => {
                expect(res.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            title: 'Any title',
                            ownerId: '3baa191c-364e-11eb-adc1-0242ac120002'
                        })
                    ])
                )
            })
    })

    test('should return http status 404 when not found', async () => {
        await request(app).get('/api/books/owner/3baa191c-364e-11eb-adc1-0242ac120026')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(404).then(res => {
                expect(res.body).toEqual({
                    error: 'NotFoundError',
                    message: "Not found book(s) by owner id equals '3baa191c-364e-11eb-adc1-0242ac120026'"
                })
            })
    })

    test('should return http status 500 when not have connection database', async () => {
        await connection.close()

        await request(app).get('/api/books/owner/3baa191c-364e-11eb-adc1-0242ac120026')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(500).then(res => {
                expect(res.body).toEqual({
                    error: 'InternalServerError',
                    message: 'Internal server error'
                })
            })
    })
})
