import { AddAccount, AddAccountModel, Hasher, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from '../add-account/db-add-account-protocols';


export class DbAddAccount implements AddAccount {
    private readonly hesher: Hasher;
    private readonly addAccountRepository: AddAccountRepository
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    
    constructor(hesher: Hasher, addAccountRepository: AddAccountRepository, loadAccountByEmailRepository: LoadAccountByEmailRepository){
        this.hesher = hesher
        this.addAccountRepository = addAccountRepository
        this.loadAccountByEmailRepository = loadAccountByEmailRepository
    }

    async add(accountData: AddAccountModel): Promise<AccountModel> {
        const account = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)
        if(!account){
            const hashedPassword = await this.hesher.hash(accountData.password)
            const newaccount = await this.addAccountRepository.add(Object.assign({}, accountData, {password: hashedPassword}))
            return newaccount
        }
        return null
    }

}