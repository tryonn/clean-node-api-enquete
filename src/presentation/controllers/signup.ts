import { badRequest } from '../helpers/http-helpers';
import { MissingParamError } from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';
import { Controller } from '../protocols/controller';

export class SignUpController implements Controller{
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
        for(const filed of requiredFields){
            if(!httpRequest.body[filed]){
                return badRequest(new MissingParamError(filed))
            }
        }
    }
}