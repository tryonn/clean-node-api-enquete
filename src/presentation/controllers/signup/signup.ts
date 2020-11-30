
import { HttpRequest, HttpResponse, Controller, AddAccount, Validation, Authentication, AuthenticationModel } from '../signup/signup-protocols';
import { badRequest, serverError, ok } from '../../helpers/http/http-helpers';

export class SignUpController implements Controller{

    private readonly addAccount: AddAccount
    private readonly validation: Validation
    private readonly authentication: Authentication

    constructor (addAccount: AddAccount, validation: Validation, authentication: Authentication){
        this.addAccount = addAccount
        this.validation = validation
        this.authentication = authentication
    }

    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body)
            if(error){
                return badRequest(error)
            }

            let { name, email, password, passwordConfirmation } = httpRequest.body            
            const account = await this.addAccount.add({
                name, 
                email, 
                password
            })
            await this.authentication.auth({
                email,
                password
            })

            return ok(account)

        } catch (error) {
            return serverError(error)
        }
    }
}