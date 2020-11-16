/* utilizando o padrao factory */

import { DbAddAccount } from '../../data/usecases/add-account/db-add-account';
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account';
import { LogoMongoRepository } from '../../infra/db/mongodb/log-repository/log';
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter';
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter';
import { SignUpController } from '../../presentation/controllers/signup/signup';
import { LogControllerDecorator } from '../decorators/log';
import { Controller } from '../../presentation/protocols/controller';
import { makeSignUpValidation } from './signup-validation';

export const makeSignUpController = (): Controller => {

    const salt = 12
    const emailValidatorAdapter = new EmailValidatorAdapter()
    const bcryptAdapter = new BcryptAdapter(salt)
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignUpValidation())
    const logMongoRepository = new LogoMongoRepository
    return new LogControllerDecorator(signUpController, logMongoRepository)
}