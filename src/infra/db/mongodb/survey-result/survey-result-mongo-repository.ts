import { SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result';
import { SurveyResultModel } from '@/domain/models/survey-result';
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper';
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey/survey-result/save-survey-result-repository'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveysResult')
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId
    },{
      $set:{
        answer: data.answer,
        date: data.date
      }
    },{
      upsert: true,
      returnOriginal: false
    })
  
    return res.value && MongoHelper.map(res.value)
  }
}
