import { ValidationComposite, EmailValidation, CompareFieldsValidation, RequiredFieldValidation } from '@/validation/validators';
import { EmailValidator } from '@/validation/protocols/email-validator';
import { Validation } from '@/presentation/protocols/validation';
import { makeSignUpValidation } from './signup-validation-factory';


// mock da class validation-composite
jest.mock('@/validation/validators/validation-composite')

// FACTORY
const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('SignUpValidation Factory', () => {
    test('Should call ValidationComposite with all validations', () => {
        makeSignUpValidation()
        const validations: Validation[] = []
        for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
            validations.push(new RequiredFieldValidation(field))            
        }

        validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})

