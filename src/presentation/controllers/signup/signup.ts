import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount, Validation } from '../signup/signup-protocols';
import { InvalidParamError, MissingParamError } from '../../errors';
import { badRequest, serverError, ok } from '../../helpers/http-helpers';

export class SignUpController implements Controller{

    private readonly emailValidaotr: EmailValidator
    private readonly addAccount: AddAccount
    private readonly validation: Validation

    constructor (emailValidaotr: EmailValidator, addAccount: AddAccount, validation: Validation){
        this.emailValidaotr = emailValidaotr
        this.addAccount = addAccount
        this.validation = validation
    }


    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            this.validation.validate(httpRequest.body)
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for(const filed of requiredFields){
                if(!httpRequest.body[filed]){
                    return badRequest(new MissingParamError(filed))
                }
            }

            let { name, email, password, passwordConfirmation } = httpRequest.body

            if(password !== passwordConfirmation){
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
    
            const isValid = this.emailValidaotr.isValid(email)
            if (!isValid){
                return badRequest(new InvalidParamError('email'))
            }
            
            const account = await this.addAccount.add({
                name, 
                email, 
                password
            })

            return ok(account)

        } catch (error) {
            return serverError(error)
        }
    }
}