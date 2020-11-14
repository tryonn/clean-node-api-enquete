import { Authentication } from '../../../domain/usecases/authentication';
import { InvalidParamError } from '../../errors/invalid-param-error';
import { MissingParamError } from '../../errors/missing-param-error';
import { badRequest, serverError } from '../../helpers/http-helpers';
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
            if(!email){
                return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
            }
            
            if (!password){
                return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
            }
            
            const isValid = this.emailValidator.isValid(email)
            if(!isValid){
                return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
            }

            await this.authentication.auth(email, password)
            
        } catch (error) {
            return serverError(error)
        }
    }
}