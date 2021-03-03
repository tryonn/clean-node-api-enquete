import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { AddSurveyModel } from '@/domain/usecases/add-survey';
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository';
import { SurveysModel } from '@/domain/models/survey';

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {

    async add(surveyData: AddSurveyModel): Promise<void> {
        const surveyCollection = await MongoHelper.getCollection('surveys')
        await surveyCollection.insertOne(surveyData)
    }

    async loadAll(): Promise<SurveysModel[]> {
        const surverysCollection = await MongoHelper.getCollection('surveys')
        const surveys: SurveysModel[] = await surverysCollection.find().toArray()
        return surveys;
    }

}