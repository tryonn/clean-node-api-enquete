/* utilizando o padrao factory */

import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory';
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory';
import { SignUpController } from '../../../../presentation/controllers/signup/signup-controller';
import { Controller } from '../../../../presentation/protocols/controller';
import { makeSignUpValidation } from './signup-validation-factory';
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory';

export const makeSignUpController = (): Controller => {
    return makeLogControllerDecorator(new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication()))
}