import { SurveyResultModel } from '@/domain/models/survey-result';

export type SavedSurveyResultModel = Omit<SurveyResultModel, 'id'>

export interface SaveSurveyResult {
    save(data: SavedSurveyResultModel): Promise<SurveyResultModel>
}