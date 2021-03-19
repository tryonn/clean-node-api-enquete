import { EmailValidator } from '@/validation/protocols/email-validator';
import { InvalidParamError } from '@/presentation/errors/invalid-param-error';
import { Validation } from '@/presentation/protocols/validation';

export class EmailValidation implements Validation {

    private readonly fieldName: string
    private readonly emailValidaotr: EmailValidator
    
    constructor(fieldName: string, emailValidaotr: EmailValidator) {
        this.fieldName = fieldName
        this.emailValidaotr = emailValidaotr
    }

    validate(input: any): Error {
        const isValid = this.emailValidaotr.isValid(input[this.fieldName])
        if (!isValid){
            return new InvalidParamError(this.fieldName)
        }
    }
}