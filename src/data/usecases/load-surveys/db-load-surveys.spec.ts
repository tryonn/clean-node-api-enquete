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

interface SutTypes{
    sut: DbLoadSurveys
    loadSurveysRepositoryStub: LoadSurveysRepository
}

const makeLoadSurveysRepository = (): LoadSurveysRepository => {

    class LoadSurveysRepositoryStub implements LoadSurveysRepository {
        async loadAll(): Promise<SurveysModel[]> {
            return new Promise(resolve => resolve(makeFakeSurveys()))
        }
    }
    return new LoadSurveysRepositoryStub()
}

const makeSut = (): SutTypes => {
    const loadSurveysRepositoryStub = makeLoadSurveysRepository()
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub)
    return {
        sut,
        loadSurveysRepositoryStub
    }

}

describe('DbLoadSurveys', () => {

    test('Should call LoadSurveysRepository', async () => {
        const { sut, loadSurveysRepositoryStub } = makeSut()
        const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
        await sut.load()
        expect(loadAllSpy).toHaveBeenCalled();
    })

    test('Should return a list of Surveys on success', async () => {
        const { sut } = makeSut()
        const surveys = await sut.load()
        expect(surveys).toEqual(makeFakeSurveys());
    })
})