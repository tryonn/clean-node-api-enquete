import { SurveysModel } from '@/domain/models/survey';

export interface LoadSurveyById {
    loadById(id: string): Promise<SurveysModel>
}