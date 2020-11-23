import env from '../../config/env'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator';
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication';
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository';
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter';
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter';
import { LoginController } from '../../../presentation/controllers/login/login-controller';
import { Controller } from '../../../presentation/protocols/controller';
import { LogoMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';
import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const jwtAdapter = new JwtAdapter(env.jwtSecret)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
    const loginController = new LoginController(dbAuthentication, makeLoginValidation())
    const logoMongoRepository = new LogoMongoRepository()
    return new LogControllerDecorator(loginController, logoMongoRepository)
}