import { InvalidParamError, MissingParamError } from '../errors';
import { EmialValidator } from '../protocols/email-validator';

import { badRequest, serverError } from '../helpers/http-helpers';
import {  } from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller } from '../protocols/controller';

export class SignUpController implements Controller{

    private readonly emailValidaotr: EmialValidator

    constructor (emailValidaotr: EmialValidator){
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
    
            const isValid = this.emailValidaotr.isValid(httpRequest.body.email)
            if (!isValid){
                return badRequest(new InvalidParamError('email'))
            }   
        } catch (error) {
            return serverError()
        }
    }
}