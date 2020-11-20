import { AuthenticationModel } from '../../../domain/usecases/authentication';
import { DbAuthentication } from './db-authentication';
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository';
import { AccountModel } from '../../../domain/models/account';

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
})

const makeFakeAuthenticationModel = (): AuthenticationModel => ({
    email: 'any_email@mail.com',
    password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async load (email: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(makeFakeAccount()))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
    sut: DbAuthentication
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    return {
        sut, 
        loadAccountByEmailRepositoryStub
    }
}

describe('DbAuthentication UseCase', () => {
    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
        await sut.auth(makeFakeAuthenticationModel())
        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
    })

    test('Should throws if LoadAccountByEmailRepository throws', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
            .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const promise = sut.auth(makeFakeAuthenticationModel())
        expect(promise).rejects.toThrow()
    })
})