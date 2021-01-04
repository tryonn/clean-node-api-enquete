import { AccountModel } from '../models/account';

export interface SurveyAnswer {
    image : string,
    answers: string
}

export interface AddSurveyModel {
    question : string,
    answers: SurveyAnswer[]
}

export interface AddSurvey {
    add(data: AddSurveyModel): Promise<void>
}