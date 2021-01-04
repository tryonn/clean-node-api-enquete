import { LoginController } from '../../../../presentation/controllers/login/login/login-controller';
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbAuthentication } from '../../use-cases/authentication/db-authentication-factory';
import { Controller } from '../../../../presentation/protocols/controller';
import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = (): Controller => {
    return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()))
}