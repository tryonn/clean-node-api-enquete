import { Authentication } from '../../../domain/usecases/authentication';
import { InvalidParamError } from '../../errors/invalid-param-error';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, serverError, unauthorized } from '../../helpers/http-helpers';
import { Controller, HttpResponse, HttpRequest } from '../../protocols';
import { EmailValidator } from '../signup/signup-protocols';

export class LoginController implements Controller {

    private readonly emailValidator: EmailValidator
    private readonly authentication: Authentication

    constructor(emailValidator: EmailValidator, authentication: Authentication){
        this.emailValidator = emailValidator
        this.authentication = authentication
    }

    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        const {email, password } = httpRequest.body
        try {

            const requiredFields = ['email', 'password']
            for(const filed of requiredFields){
                if(!httpRequest.body[filed]){
                    return badRequest(new MissingParamError(filed))
                }
            }

            const isValid = this.emailValidator.isValid(email)
            if(!isValid){
                return badRequest(new InvalidParamError('email'))
            }

            const accessToken = await this.authentication.auth(email, password)
            if(!accessToken){
                return unauthorized()
            }
            
        } catch (error) {
            return serverError(error)
        }
    }
}