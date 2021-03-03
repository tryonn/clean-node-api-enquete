import { makeAuthMiddleware } from '@/main/factories/middlewares/auth-middleware-factory';
import { adaptMiddleware } from '@/main/adapters/express/express-middleware-adapter';

export const auth = adaptMiddleware(makeAuthMiddleware())