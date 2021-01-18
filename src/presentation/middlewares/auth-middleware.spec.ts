import { LoadAccountByToken } from './../../domain/usecases/load-account-by-token';
import { AuthMiddleware } from './auth-middleware';

import { HttpRequest } from './../protocols/';
import { forbidden } from './../helpers/http/http-helpers';
import { AccessDeniedError } from '../errors';
import { AccountModel } from '../../domain/models/account';

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hash_password'
})

describe('Auth Meddleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {


        class LoadAccountByTokenStub implements LoadAccountByToken {
            async load(accessToken: string, role?: string): Promise<AccountModel> {
                return new Promise(resolve => resolve(makeFakeAccount()))
            }

        }


        const loadAccountByTokenStub = new LoadAccountByTokenStub()


        const sut = new AuthMiddleware(loadAccountByTokenStub)
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })

    test('Should call LoadAccountByToken with correct accessToken', async () => {
        class LoadAccountByTokenStub implements LoadAccountByToken {
            async load(accessToken: string, role?: string): Promise<AccountModel> {
                return new Promise(resolve => resolve(makeFakeAccount()))
            }

        }


        const loadAccountByTokenStub = new LoadAccountByTokenStub()
        const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load')
        const sut = new AuthMiddleware(loadAccountByTokenStub)

        await sut.handle({
            headers: {
                'x-access-token': 'any_token'
            }
        })
        
        expect(loadSpy).toHaveBeenCalledWith('any_token')
    })
})