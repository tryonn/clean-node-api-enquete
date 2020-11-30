import { Router } from 'express'
import { makeSignUpController } from '../factories/controller/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controller/login/login-controller-factory'
import { adaptRoute } from '../adapters/express/express-route-adapter'

export default(router: Router):void => {
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.post('/login', adaptRoute(makeLoginController()))
}