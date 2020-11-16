import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import userController from './Controller';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
// import IRequest from '../../IRequest';


//  const traineeRouter = new (Router as any)();

const userRouter = Router();


userRouter.route('/')
    .get(authMiddleWare('getUsers', 'read'), validationHandler(validation.get), userController.get)
    .post(authMiddleWare('getUsers', 'read'), validationHandler(validation.create), userController.create)
    .put(authMiddleWare('getUsers', 'read'), validationHandler(validation.update), userController.update);
    userRouter.route('/:id').delete(authMiddleWare('getUsers', 'read'), validationHandler(validation.delete), userController.delete);

userRouter.route('/login')
    .post(validationHandler(validation.login), userController.login);

userRouter.route('/me')
    .get(authMiddleWare('getUsers', 'read'), userController.me);
export default userRouter;