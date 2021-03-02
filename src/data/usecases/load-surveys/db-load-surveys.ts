import { LoadSurveysRepository } from './../../protocols/db/survey/load-surveys-repository';
import { SurveysModel } from '../../../domain/models/survey';
import { LoadSurveys } from './../../../domain/usecases/load-surveys';

export class DbLoadSurveys implements LoadSurveys {

    constructor(private readonly loadSurveysRepository: LoadSurveysRepository){}

    async load(): Promise<SurveysModel[]> {
        const surveys = await this.loadSurveysRepository.loadAll()
        return surveys
    }

}