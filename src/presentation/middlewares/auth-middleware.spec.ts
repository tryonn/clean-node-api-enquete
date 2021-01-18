import { AuthMiddleware } from './auth-middleware';

import { HttpRequest } from './../protocols/';
import { forbidden } from './../helpers/http/http-helpers';
import { AccessDeniedError } from '../errors';


describe('Auth Meddleware', () => {
    test('Should return 403 if no x-access-token exists in headers', async () => {

        const sut = new AuthMiddleware()
        const httpResponse = await sut.handle({})
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
    })
})