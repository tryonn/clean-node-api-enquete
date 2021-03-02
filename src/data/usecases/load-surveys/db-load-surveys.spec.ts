import { DbLoadSurveys } from './db-load-surveys';
import { SurveysModel } from '../../../domain/models/survey';
import { LoadSurveysRepository } from './../../protocols/db/survey/load-surveys-repository';



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

describe('DbLoadSurveys', () => {
    test('Should call LoadSurveysRepository', async () => {

        class LoadSurveysRepositoryStub implements LoadSurveysRepository {
            async loadAll(): Promise<SurveysModel[]> {
                return new Promise(resolve => resolve(makeFakeSurveys()))
            }
        }

        const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub()
        const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
        const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
        await sut.load()
        expect(loadAllSpy).toHaveBeenCalled();
    })
})