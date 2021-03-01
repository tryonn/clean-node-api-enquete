import { Collection } from 'mongodb';
import { SurveyMongoRepository } from './survey-mongo-repository';
import { MongoHelper } from '../helpers/mongo-helper'
import MockDate from 'mockdate'

let surveyCollection: Collection

describe('Account Mongo Repository', () => {

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL)
        MockDate.set(new Date())
    })

    afterAll(async () => {
        await MongoHelper.disconnect()
        MockDate.reset()
    })

    beforeEach(async () => {
        surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.deleteMany({})
    })

    const makeSut = (): SurveyMongoRepository => {
        return new SurveyMongoRepository()
    }

    test('Should return an survey on add success', async () => {
        const sut = makeSut()
        await sut.add({
            question: 'any_question',
            answers: [{
                image: 'any_image',
                answers: 'any_answer'
            },{
                answers: 'other_answer'
            }],
            date: new Date()
        })

        const survey = await surveyCollection.findOne({ question: 'any_question'})
        expect(survey).toBeTruthy()
    })
})