import { DbLoadAccountByToken } from './../../../../../data/usecases/load-account-by-token/db-load-account-by-toke';
import { JwtAdapter } from './../../../../../infra/criptography/jwt-adapter/jwt-adapter';
import { LoadAccountByToken } from './../../../../../domain/usecases/load-account-by-token';
import { AccountMongoRepository } from '../../../../../infra/db/mongodb/account/account-mongo-repository';
import env from '../../../../config/env';
/* utilizando o padrao factory */


export const makeDbLoadAccountByToken = (): LoadAccountByToken => {

    const jwtAdapter = new JwtAdapter(env.jwtSecret);
    const accountMongoRepository = new AccountMongoRepository()
    return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
}