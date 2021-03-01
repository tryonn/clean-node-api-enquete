import { LoadSurveys, SurveysModel } from './load-survey-controller-protocols';
import { LoadSurveysController } from './load-surveys-controller';

import MockDate from 'mockdate'


const makeFakeSurveys = (): SurveysModel[] => {
    return [{
        id: 'any_id',
        question: 'any_question',
        answers: [{
            image: 'any_image',
            answers: 'any_answer'
        }],
        date: new Date()
    },
    {
        id: 'other_id',
        question: 'other_question',
        answers: [{
            image: 'other_image',
            answers: 'other_answer'
        }],
        date: new Date()
    }]
}

describe('LoadSurveys Controller', () => {

    beforeAll(() => {
        MockDate.set(new Date())
    })

    afterAll(() => {
        MockDate.reset()
    })

    test('Should call LoadSurveys', async () => {

        class LoadSurveysStub implements LoadSurveys {

            async load(): Promise<SurveysModel[]> {
                return new Promise(resolve => resolve(makeFakeSurveys()))
            }

        }

        const loadSurveysStub = new LoadSurveysStub()
        const loadSpy = jest.spyOn(loadSurveysStub, 'load')
        const sut = new LoadSurveysController(loadSurveysStub)
        await sut.handle({})
        expect(loadSpy).toHaveBeenCalled()
    })
})