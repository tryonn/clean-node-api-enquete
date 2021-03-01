import { LoginController } from '../../../../../presentation/controllers/login/login/login-controller';
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory';
import { Controller } from '../../../../../presentation/protocols/controller';
import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey/add-survey-controller';
import { makeAddSurveyValidation } from './add-survey-validation-factory';
import { makeDbAddSurvey } from '../../../use-cases/survey/add-survey/db-add-survey-factory';

export const makeAddSurveyController = (): Controller => {
    const controller = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
    return makeLogControllerDecorator(controller)
}