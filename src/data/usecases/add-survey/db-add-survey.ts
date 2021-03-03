import { AddSurvey, AddSurveyModel, AddSurveyRepository } from '@/data/usecases/add-account/db-add-account-protocols'

export class DbAddSurvey implements AddSurvey {

    constructor(
        private readonly addSurveyRepository: AddSurveyRepository
    ){}

    async add(data: AddSurveyModel): Promise<void> {
        await this.addSurveyRepository.add(data)
    }

}