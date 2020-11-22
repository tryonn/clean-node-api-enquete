import { JwtAdapter } from './jwt-adapter';
import jwt from 'jsonwebtoken'

jest.mock('jsonwebtoken', () => ({
    async sign (): Promise<string> {
        return new Promise(resolve => resolve('any_token'))
    }
}))

describe('JWT Adapter', () => {
    test('Should call sign with correct values', async () => {
        const sut = new JwtAdapter('secret')
        const signSpy = jest.spyOn(jwt, 'sign')
        await sut.encrypter('any_id')
        expect(signSpy).toHaveBeenCalledWith({ id: 'any_id'}, 'secret')  
    })

    test('Should return a token on sign success', async () => {
        const sut = new JwtAdapter('secret')
        const signSpy = jest.spyOn(jwt, 'sign')
        const accessToken = await sut.encrypter('any_id')
        expect(accessToken).toBe('any_token')
    })
})