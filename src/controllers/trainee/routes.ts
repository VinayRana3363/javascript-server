import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import traineeController from './Controller';
import validation from './validation';


//  const traineeRouter = new (Router as any)();

const traineeRouter = Router();

traineeRouter.route('/')
    .get(validationHandler(validation.get), traineeController.get)
    .post(validationHandler(validation.create), traineeController.create)
    .put(validationHandler(validation.update), traineeController.update);
    traineeRouter.route('/:id').delete(validationHandler(validation.delete), traineeController.delete);

export default traineeRouter;