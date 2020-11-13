import { LogControllerDecorator } from './log'
import { Controller, HttpRequest, HttpResponse } from '../../presentation/protocols';

interface SutTypes {
    sut: LogControllerDecorator
    controllerStub: Controller
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
const makeSut = (): SutTypes => {
    const controllerStub = makeControllerStub()
    const sut = new LogControllerDecorator(controllerStub)
    return {
        sut, 
        controllerStub
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
})