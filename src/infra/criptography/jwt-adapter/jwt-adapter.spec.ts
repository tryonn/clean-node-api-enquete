import { JwtAdapter } from './jwt-adapter';
import jwt from 'jsonwebtoken'

describe('JWT Adapter', () => {
    test('Should call sign with correct values', async () => {
        const sut = new JwtAdapter('secret')
        const signSpy = jest.spyOn(jwt, 'sign')
        await sut.encrypter('any_id')
        expect(signSpy).toHaveBeenCalledWith({ id: 'any_id'}, 'secret')  
    })
})