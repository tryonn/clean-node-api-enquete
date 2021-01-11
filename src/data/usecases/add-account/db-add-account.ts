import { AddAccount, AddAccountModel, Hasher, AccountModel, AddAccountRepository, LoadAccountByEmailRepository } from '../add-account/db-add-account-protocols';


export class DbAddAccount implements AddAccount {
   
    
    constructor(
        private readonly hesher: Hasher,
        private readonly addAccountRepository: AddAccountRepository,
        private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
    ){}

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