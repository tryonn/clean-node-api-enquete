import { LogControllerDecorator } from '../../decorators/log-controller-decorator';
import { Controller } from '../../../presentation/protocols/controller';
import { LogoMongoRepository } from '../../../infra/db/mongodb/log/log-mongo-repository';


export const makeLogControllerDecorator = (controller: Controller): Controller => {
    const logoMongoRepository = new LogoMongoRepository()
    return new LogControllerDecorator(controller, logoMongoRepository)
}