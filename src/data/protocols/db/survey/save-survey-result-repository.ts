import { SurveyResultModel } from '@/domain/models/survey-result'
import { SavedSurveyResultModel } from '@/domain/usecases/save-survey-result'

export interface SaveSurveyResultRepository {
  save: (data: SavedSurveyResultModel) => Promise<SurveyResultModel>
}
