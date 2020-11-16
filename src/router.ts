import { Router } from 'express';
import { traineeRouter } from './controllers';

// const mainRouter = new (Router as any)();

const mainRouter = Router();

mainRouter.use('/trainee', traineeRouter);

mainRouter.use('/user', traineeRouter);

export default mainRouter;
