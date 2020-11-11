import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'

describe('Bcrypt Adapter', () => {
    test('Should call Bcrypt with correct value', async () => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(bcrypt.hash).toHaveBeenCalledWith('any_value', salt)
    })
})