export type SurveyModel = {
    id: string,
    question : string,
    answers: SurveyAnswerModel[],
    date: Date
}

export type SurveyAnswerModel = {
    image? : string,
    answers: string
}
