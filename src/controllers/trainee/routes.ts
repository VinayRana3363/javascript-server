import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import traineeController from './Controller';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';


//  const traineeRouter = new (Router as any)();

const traineeRouter = Router();

traineeRouter.route('/')
    .get(authMiddleWare('getUsers', 'read'), validationHandler(validation.get), traineeController.get)
    .post(authMiddleWare('getUsers', 'read'), validationHandler(validation.create), traineeController.create)
    .put(authMiddleWare('getUsers', 'read'), validationHandler(validation.update), traineeController.update);
    traineeRouter.route('/:id').delete(authMiddleWare('getUsers', 'read'), validationHandler(validation.delete), traineeController.delete);

export default traineeRouter;