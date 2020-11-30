import { Hasher, AccountModel, AddAccountModel, AddAccountRepository, LoadAccountByEmailRepository } from '../add-account/db-add-account-protocols';
import { DbAddAccount } from './db-add-account';

const makeHasher = (): Hasher => {
    class HasherStub implements Hasher {
        async hash (value: string): Promise<string> {
            return new Promise(resolve => resolve('hashed_password'))
        }
    }

    return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
        async add(accountData: AddAccountModel): Promise<AccountModel> {
            const fakeAccount = {
                id: 'valid_id',
                name: 'valid_name',
                email: 'valid_email@mail.com',
                password: 'hashed_password'
            }
            return new Promise(resolve => resolve(fakeAccount))
        }
    }
    return new AddAccountRepositoryStub()
}

const makeFakeAccount = (): AccountModel => ({
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'hash_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'hash_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
        async loadByEmail (email: string): Promise<AccountModel> {
            return new Promise(resolve => resolve(null))
        }
    }
    return new LoadAccountByEmailRepositoryStub()
}

interface SutTypes {
    sut: DbAddAccount
    hasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
    loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
    const hasherStub = makeHasher()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
    const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
    return {
        sut,
        hasherStub,
        addAccountRepositoryStub,
        loadAccountByEmailRepositoryStub
    }
}

describe('DbAddAccount Usecase', () => {

    test('Should call Hasher with correct password ', async () => {

        const { sut, hasherStub } = makeSut()      
        const encryptSpy = jest.spyOn(hasherStub, 'hash')
        await sut.add(makeFakeAccountData())

        expect(encryptSpy).toHaveBeenCalledWith('hash_password')
    })

    test('Should throws if Encrypter throws  ', async () => {

        const { sut, hasherStub } = makeSut()      
        jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resovel, rejects) => rejects(new Error())))
        const promise = sut.add(makeFakeAccountData())
        expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        await sut.add(makeFakeAccountData())
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'hashed_password'
        })
    })

    test('Should throws if AddAccount throws  ', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()      
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resovel, rejects) => rejects(new Error())))
        const promise = sut.add(makeFakeAccountData())
        expect(promise).rejects.toThrow()
    })

    test('Should return an account on success', async () => {
        const { sut } = makeSut()
        const account = await sut.add(makeFakeAccountData())
        expect(account).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'hashed_password'
        })
    })

    test('Should call LoadAccountByEmailRepository with correct email', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
        await sut.add(makeFakeAccount())
        expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
    })

    test('Should return null if LoadAccountByEmailRepository not return null ', async () => {
        const { sut, loadAccountByEmailRepositoryStub } = makeSut()
        jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeAccount())))
        const account = await sut.add(makeFakeAccountData())
        expect(account).toBeNull()
    })
})