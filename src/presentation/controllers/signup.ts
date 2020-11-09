import { AddAccount } from '../../domain/usecases/add-account';
import { InvalidParamError, MissingParamError } from '../errors';
import { badRequest, serverError } from '../helpers/http-helpers';
import {  } from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller, EmailValidator } from '../protocols';

export class SignUpController implements Controller{

    private readonly emailValidaotr: EmailValidator
    private readonly addAccount: AddAccount

    constructor (emailValidaotr: EmailValidator, addAccount: AddAccount){
        this.emailValidaotr = emailValidaotr
        this.addAccount = addAccount
    }


    handle(httpRequest: HttpRequest): HttpResponse {
        try {
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
            
            this.addAccount.add({
                name, 
                email, 
                password
            })
        } catch (error) {
            return serverError()
        }
    }
}