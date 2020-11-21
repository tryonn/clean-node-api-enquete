import { Hasher, AccountModel, AddAccountModel, AddAccountRepository } from '../add-account/db-add-account-protocols';
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

interface SutTypes {
    sut: DbAddAccount
    hasherStub: Hasher
    addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): SutTypes => {
    const hasherStub = makeHasher()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub)
    return {
        sut,
        hasherStub,
        addAccountRepositoryStub
    }
}

describe('DbAddAccount Usecase', () => {

    test('Should call Hasher with correct password ', async () => {

        const { sut, hasherStub } = makeSut()      
        const encryptSpy = jest.spyOn(hasherStub, 'hash')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'valid_password'
        }

        await sut.add(accountData)

        expect(encryptSpy).toHaveBeenCalledWith('valid_password')
    })

    test('Should throws if Encrypter throws  ', async () => {

        const { sut, hasherStub } = makeSut()      
        jest.spyOn(hasherStub, 'hash').mockReturnValueOnce(new Promise((resovel, rejects) => rejects(new Error())))
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'valid_password'
        }

        const promise = sut.add(accountData)

        expect(promise).rejects.toThrow()
    })

    test('Should call AddAccountRepository with correct values', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()
        const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'valid_password'
        }
        await sut.add(accountData)
        expect(addSpy).toHaveBeenCalledWith({
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'hashed_password'

        })
    })

    test('Should throws if AddAccount throws  ', async () => {
        const { sut, addAccountRepositoryStub } = makeSut()      
        jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(new Promise((resovel, rejects) => rejects(new Error())))
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'valid_password'
        }

        const promise = sut.add(accountData)

        expect(promise).rejects.toThrow()
    })

    test('Should return an account on success', async () => {
        const { sut } = makeSut()
        const accountData = {
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'valid_password'
        }
        const account = await sut.add(accountData)
        expect(account).toEqual({
            id: 'valid_id',
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'hashed_password'
        })
    })
})