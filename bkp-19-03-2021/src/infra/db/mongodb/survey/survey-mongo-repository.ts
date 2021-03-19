import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { SurveyModel } from '@/domain/models/survey'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surverysCollection = await MongoHelper.getCollection('surveys')
    const surveys: SurveyModel[] = await surverysCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel> {
    const surverysCollection = await MongoHelper.getCollection('surveys')
    const surveys = await surverysCollection.findOne({ _id: id })
    return surveys && MongoHelper.map(surveys)
  }
}
