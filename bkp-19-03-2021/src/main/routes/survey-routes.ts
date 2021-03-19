import { auth } from '@/main/middlewares/auth';
import { adminAuth } from '@/main/middlewares/admin-auth';
import { makeLoadSurveysController } from '@/main/factories/controller/survey/load-surveys/load-surveys-controller-factory';
import { Router } from 'express'
import { adaptMiddleware } from '@/main/adapters/express/express-middleware-adapter'
import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controller/survey/add-survey/add-survey-controller-factory'

export default(router: Router):void => {
   router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
   router.get('/surveys', auth, adaptMiddleware(makeLoadSurveysController()))
}