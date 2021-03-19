import { ValidationComposite, RequiredFieldValidation } from '@/validation/validators';

import { Validation } from '@/presentation/protocols/validation';
import { makeAddSurveyValidation } from './add-survey-validation-factory';
import MoackDate from 'mockdate'

// mock da class validation-composite
jest.mock('@/validation/validators/validation-composite')

describe('SurveyValidation Factory', () => {

    beforeAll(() => {
        MoackDate.set(new Date())
    })

    afterAll(() => {
        MoackDate.reset()
    })

    test('Should call ValidationComposite with all validations', () => {
        makeAddSurveyValidation()
        const validations: Validation[] = []
        for(const field of ['question', 'answers']){
            validations.push(new RequiredFieldValidation(field))            
        }
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})

