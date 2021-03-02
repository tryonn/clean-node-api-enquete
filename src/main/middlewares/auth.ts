import { makeAuthMiddleware } from './../factories/middlewares/auth-middleware-factory';
import { adaptMiddleware } from './../adapters/express/express-middleware-adapter';



   export const auth = adaptMiddleware(makeAuthMiddleware())