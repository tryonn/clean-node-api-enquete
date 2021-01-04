import { badRequest } from './../../../helpers/http/http-helpers';
import { Validation } from './../../../protocols/validation';
import { HttpRequest } from './add-survey-controller-protocols';
import { AddSurveyController } from './add-survey-controller'

const makeFakeRequest = (): HttpRequest => ({
    body: {
        question: 'any_question',
        answers: [{
                image: 'any_image',
                answer: 'any_answer'
            }]
    }
})

interface SutTypes {
    sut: AddSurveyController
    validationStub: Validation
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate (input: any): Error {
            return null;
        }
    }
    return new ValidationStub()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const sut = new AddSurveyController(validationStub)
    return {
        sut,
        validationStub
    }
}

describe('AddSurvey Controller', () => {

    test('Should call Validation with correct values', async () => {
        const { validationStub, sut} = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpResquest = makeFakeRequest();
        await sut.handle(httpResquest)
        expect(validateSpy).toHaveBeenCalledWith(httpResquest.body)
    })

    test('Should return 400 if Validation fails', async () => {
        const { validationStub, sut} = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
        const httpResquest = await sut.handle(makeFakeRequest())
        expect(httpResquest).toEqual(badRequest(new Error()))
    })
})