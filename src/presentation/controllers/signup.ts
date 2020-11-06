import { badRequest } from '../helpers/http-helpers';
import { MissingParamError } from '../errors/missing-param-error';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController {
    handle(httpRequest: HttpRequest): HttpResponse {
        const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
        for(const filed of requiredFields){
            if(!httpRequest.body[filed]){
                return badRequest(new MissingParamError(filed))
            }
        }
    }
}