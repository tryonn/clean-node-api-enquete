import { LogErrorRepository } from '../../data/protocols/log-error-repository';
import { LogControllerDecorator } from './log'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';
import { serverError } from '../../presentation/helpers/http/http-helpers';

interface SutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
    logErrorRepositoryStub: LogErrorRepository
}

const makeControllerStub = () => {
    class ControllerStub implements Controller {
        async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
            const httpResponse: HttpResponse = {
                statusCode: 200,
                body: {
                    name: 'Lima',
                    email: 'lima_email@mail.com',
                    password: '222',
                    passwordConfirmation: '222'
                }
            }
            return new Promise(resolve => resolve(httpResponse))
        }
    }
    return new ControllerStub()
}

const makeLogErrorRepositoryStub = (): LogErrorRepository => {
    class LogErrorRepositoryStub implements LogErrorRepository {
        async logError(stack: string): Promise<void> {
            return new Promise(resolve => resolve())
        }
    }
    return new LogErrorRepositoryStub()
}

const makeSut = (): SutTypes => {
    const controllerStub = makeControllerStub()
    const logErrorRepositoryStub = makeLogErrorRepositoryStub()
    const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
    return {
        sut, 
        controllerStub,
        logErrorRepositoryStub
    }

}

describe('LogController Decorator', () => {
    test('Should call controller handle', async () => {
        const {sut, controllerStub} = makeSut()
        const handleSpy = jest.spyOn(controllerStub, 'handle')
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        await sut.handle(httpRequest)
        expect(handleSpy).toHaveBeenCalledWith(httpRequest)
    })

    test('Should return the same result of the controller', async () => {
        const { sut } = makeSut()
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual({
            statusCode: 200,
            body: {
                name: 'Lima',
                email: 'lima_email@mail.com',
                password: '222',
                passwordConfirmation: '222'
            }
        })
    })

    test('Should call LogErrorRepository with correct if controller returns a server error', async () => {
        const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
        const fakeError = new Error()
        fakeError.stack = 'any_stack'
        const error = serverError(fakeError)
        const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
        //mock data
        jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))
        const httpRequest = {
            body: {
                name: 'any_name',
                email: 'any_email@mail.com',
                password: 'any_password',
                passwordConfirmation: 'any_password'
            }
        }
        await sut.handle(httpRequest)
        expect(logSpy).toHaveBeenCalledWith('any_stack')
    })
})