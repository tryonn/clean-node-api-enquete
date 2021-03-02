import { auth } from './../middlewares/auth';
import { adminAuth } from './../middlewares/admin-auth';
import { makeLoadSurveysController } from './../factories/controller/survey/load-surveys/load-surveys-controller-factory';
import { Router } from 'express'
import { adaptMiddleware } from '../adapters/express/express-middleware-adapter'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controller/survey/add-survey/add-survey-controller-factory'

export default(router: Router):void => {
   router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
   router.get('/surveys', auth, adaptMiddleware(makeLoadSurveysController())
}