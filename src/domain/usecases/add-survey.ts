import { SurveysModel } from './../models/survey';

export type AddSurveyModel = Omit<SurveysModel, 'id'>

export interface AddSurvey {
    add(data: AddSurveyModel): Promise<void>
}