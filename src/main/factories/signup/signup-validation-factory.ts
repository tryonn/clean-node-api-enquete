/* utilizando o padrao factory */
import { EmailValidatorAdapter } from '../../adapters/validators/email-validator-adapter';
import { ValidationComposite, EmailValidation, CompareFieldsValidation, RequiredFieldValidation } from '../../../presentation/helpers/validators';

import { Validation } from '../../../presentation/protocols/validation';

export const makeSignUpValidation = (): ValidationComposite => {

    const validations: Validation[] = []
    for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
        validations.push(new RequiredFieldValidation(field))            
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter))
    return new ValidationComposite(validations)
}