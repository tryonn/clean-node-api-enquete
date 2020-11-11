import bcrypt, { hash } from 'bcrypt'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'

// mock do bcrypt
jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    }
}))

describe('Bcrypt Adapter', () => {
    test('Should call Bcrypt with correct value', async () => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('any_value')
        expect(bcrypt.hash).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should return a hash on success', async () => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hash = await sut.encrypt('any_value')
        expect(hash).toBe('hash')
    })
})