import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory';
import { makeDbLoadSurveys } from '@/main/factories/use-cases/survey/add-survey/load-surveys-factory';
import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys-controller';

import { Controller } from '@/presentation/protocols/controller';

export const makeLoadSurveysController = (): Controller => {
    const controller = new LoadSurveysController(makeDbLoadSurveys())
    return makeLogControllerDecorator(controller)
}