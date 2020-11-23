import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper';


describe('Login Routes', () => {

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    describe('Post /signup', () => {
        test('Should return an account on success', async () => {
            await request(app)
            .post('/api/signup')
            .send({
                name: 'Simão',
                email: 'simaomenezesneto@gmail.com',
                password: '123',
                passwordConfirmation: '123'
            })
            .expect(200)
        })
    })
})