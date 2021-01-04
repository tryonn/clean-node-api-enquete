import { badRequest } from './../../../helpers/http/http-helpers';
import { Validation } from './../../../protocols/validation';
import { HttpRequest, AddSurvey, AddSurveyModel } from './add-survey-controller-protocols';
import { AddSurveyController } from './add-survey-controller'
import { resolve } from 'path';

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
    addSurveyStub: AddSurvey
}

const makeValidation = (): Validation => {
    class ValidationStub implements Validation {
        validate (input: any): Error {
            return null;
        }
    }
    return new ValidationStub()
}

const makeAddSurvey = (): AddSurvey => {
    class AddSurveyStub implements AddSurvey {
        async add (data: AddSurveyModel): Promise<void> {
            return new Promise(resovle => resolve())
        }
    }

    return new AddSurveyStub()
}

const makeSut = (): SutTypes => {
    const validationStub = makeValidation()
    const addSurveyStub = makeAddSurvey()
    const sut = new AddSurveyController(validationStub, addSurveyStub)
    return {
        sut,
        validationStub,
        addSurveyStub
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


    test('Should call Validation with correct values', async () => {
        const { sut, addSurveyStub } = makeSut()
        const addSpy = jest.spyOn(addSurveyStub, 'add')
        const httpResquest = makeFakeRequest();
        await sut.handle(httpResquest)
        expect(addSpy).toHaveBeenCalledWith(httpResquest.body)
    })
})