import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helpers';
import {  } from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller, EmailValidator } from '../protocols';

export class SignUpController implements Controller{

    private readonly emailValidaotr: EmailValidator

    constructor (emailValidaotr: EmailValidator){
        this.emailValidaotr = emailValidaotr
    }


    handle(httpRequest: HttpRequest): HttpResponse {
        try {
            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
            for(const filed of requiredFields){
                if(!httpRequest.body[filed]){
                    return badRequest(new MissingParamError(filed))
                }
            }
            if(httpRequest.body.password !== httpRequest.body.passwordConfirmation){
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
    
            const isValid = this.emailValidaotr.isValid(httpRequest.body.email)
            if (!isValid){
                return badRequest(new InvalidParamError('email'))
            }   
        } catch (error) {
            return serverError()
        }
    }
}