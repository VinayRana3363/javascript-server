import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import userController from './Controller';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
import { permissions } from '../../libs/constants';


const userRouter = Router();


/**
 * @swagger
 *
 * /api/user/login:
 *   post:
 *     description: Login Credentials
 *     security:
 *       - Bearer: []
 *     tags:
 *       - User
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: User
 *         description: User email and password
 *         in: body
 *         required: true
 *         type: object
 *         example: {
 *                        "email": "testVinay@succesive.tech",
 *                        "password": "123"
 *                   }
 *     responses:
 *       200:
 *         description: Login Successfully
 *         schema:
 *          oneOf:
 *          properties:
 *              message:
 *                  example: Login Permitted
 *              Token:
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiX2lkIjoiNWZiZTJkYzJiZjIzMWUyZGFjYjFjNWM0Iiwib3JpZ2luYWxJZCI6IjVmYmUyZGMyYmYyMzFlMmRhY2IxYzVjNCIsIm5hbWUiOiJWaW5heSIsInJvbGUiOiJoZWFkLXRyYWluZXIiLCJlbWFpbCI6InRlc3RWaW5heUBzdWNjZXNpdmUudGVjaCIsInBhc3N3b3JkIjoiJDJiJDEwJDZXVTNQM28wbmxUajZhY09yR3pnWmVYOHR2R3M4WGZPR0RrMHhmSkljZXUzNzY5OERYTFd1IiwiY3JlYXRlZEF0IjoiMjAyMC0xMS0yNVQxMDoxMToxNC41NjJaIiwiX192IjowfSwiaWF0IjoxNjA2NDYzOTYzLCJleHAiOjE2MDY0NjQ4NjN9.b0v6sfCaBChEi7zmf_m3idQ_ncS_OkFBrIB6aim_ufc"
 *              code:
 *                  example: 200
 *       400:
 *         description: invalid email or password
 *         schema:
 *          oneOf:
 *          properties:
 *              message:
 *                  example: Check Your Credentials
 *              code:
 *                  example: 404
 */
userRouter.route('/login')
    .post(validationHandler(validation.login), userController.login);
/**
 * @swagger
 *
 * /api/user/me:
 *   get:
 *     description: Get the details of logged user
 *     security:
 *       - Bearer: []
 *     tags:
 *       - User
 *     consumes:
 *       - application/json
 *     produces:
 *        - application/json
 *     responses:
 *       200:
 *         description: Logged user details
 *         schema:
 *              properties:
 *                  message:
 *                      example: 'User Details'
 *                  data:
 *                      type: object
 *                      example:  {
 *                                   "user": {
 *                                       "_id": "5fbe2dc2bf231e2dacb1c5c4",
 *                                       "originalId": "5fbe2dc2bf231e2dacb1c5c4",
 *                                       "name": "Vinay",
 *                                       "role": "head-trainer",
 *                                       "email": "testVinay@succesive.tech",
 *                                       "password": "$2b$10$6WU3P3o0nlTj6acOrGzgZeX8tvGs8XfOGDk0xfJIceu37698DXLWu",
 *                                       "createdAt": "2020-11-25T10:11:14.562Z",
 *                                       "__v": 0
 *                                   }
 *                               }
 *       403:
 *         description: unauthorised access
 *         schema:
 *          oneOf:
 *          properties:
 *              message:
 *                  example: Unauthorised User
 *              code:
 *                  example: 403
 */
userRouter.route('/me')
    .get(authMiddleWare(permissions.getUsers, 'read'), userController.me);

export default userRouter;