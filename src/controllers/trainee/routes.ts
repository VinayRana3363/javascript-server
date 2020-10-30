import { Router } from 'express';
import traineeController from './Controller';

//  const traineeRouter = new (Router as any)();

const traineeRouter = Router();

console.log(traineeRouter);

traineeRouter.route('/')
    .get(traineeController.get)
    .post(traineeController.create)
    .put(traineeController.update)
    .delete(traineeController.delete);

export default traineeRouter;