import { makeAuthMiddleware } from './../factories/middlewares/auth-middleware-factory';
import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controller/survey/add-survey/add-survey-controller-factory'

export default(router: Router):void => {
   const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
   router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}