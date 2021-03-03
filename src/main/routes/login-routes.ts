import { Router } from 'express'
import { makeSignUpController } from '@/main/factories/controller/login/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controller/login/login/login-controller-factory'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'

export default(router: Router):void => {
    router.post('/signup', adaptRoute(makeSignUpController()))
    router.post('/login', adaptRoute(makeLoginController()))
}