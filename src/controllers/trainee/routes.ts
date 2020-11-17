import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import traineeController from './Controller';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
import { permissions } from '../../libs/constants';


//  const traineeRouter = new (Router as any)();

const traineeRouter = Router();

traineeRouter.route('/')
    .get(authMiddleWare(permissions.getUsers, 'read'), validationHandler(validation.get), traineeController.get)
    .post(authMiddleWare(permissions.getUsers , 'read'), traineeController.create)
    .put(authMiddleWare(permissions.getUsers , 'read'), traineeController.update);
    traineeRouter.route('/').delete(authMiddleWare(permissions.getUsers , 'read'), traineeController.delete);

export default traineeRouter;