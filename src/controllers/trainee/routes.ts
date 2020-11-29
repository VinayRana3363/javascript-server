
import { Router } from 'express';
import validationHandler from '../../libs/validationHandler';
import traineeController from './Controller';
import validation from './validation';
import { authMiddleWare } from '../../libs/routes';
import { permissions } from '../../libs/constants';

const traineeRouter = Router();

/**
 * @swagger
 *
 *  definitions:
 *      TraineePost:
 *        type: object
 *        properties:
 *          email:
 *              type: string
 *              example: sharma@successive.tech
 *          name:
 *              type: string
 *              example: sharma
 *          password:
 *              type: string
 *              example: 1234
 *          role:
 *               type: string
 *               example: trainee
 *      TraineeResponse:
 *        type: object
 *        properties:
 *          _id:
 *              example: 5e4a36bc64824b1f80b730cd
 *          email:
 *              type: string
 *              example: sharma@successive.tech
 *          name:
 *              type: string
 *              example: sharma
 *          role:
 *              type: string
 *              example: trainee
 *          originalId:
 *              example: 5e4a36bc64824b1f80b666cd
 *          createdAt:
 *              example: 2020-02-20T11:06:29.125Z
 *          v:
 *              example:444
 *      Unauthorized:
 *        type: object
 *        properties:
 *          error:
 *              example: Unauthorized
 *          message:
 *              example: Token not found
 *          status:
 *              example: 403
 *
 */
traineeRouter.route('/')
/**
 * @swagger
 *
 * /api/trainee:
 *   get:
 *     description: List of all the trainees
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Trainee
 *     consumes:
 *       - application/json
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: skip
 *         description: Number of elements to skip
 *         in: query
 *         required: false
 *         type: number
 *       - name: limit
 *         description: number of elements to show
 *         in: query
 *         required: false
 *         type: number
 *       - name: sort
 *         description: Parameter to sort (name or email)
 *         in: query
 *         required: false
 *         type: string
 *       - name: search
 *         description: Name to search
 *         in: query
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Trainee List
 *         schema:
 *              properties:
 *                  status:
 *                      example: 200 OK
 *                  message:
 *                      example: 'successfully fetched Trainee'
 *                  TotalCount:
 *                      example: 5
 *                  TraineeCount:
 *                      example: 2
 *                  data:
 *                      type: object
 *                      allOf:
 *                              - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */
    .get(authMiddleWare(permissions.getUsers, 'read'), validationHandler(validation.get), traineeController.get)
/**
 * @swagger
 *
 * /api/trainee:
 *   post:
 *     description: Create an user
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Trainee
 *     consumes:
 *       - application/json
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: userData
 *         description: Data Required for User
 *         in: body
 *         required: true
 *         type: object
 *         example: {
 *                       "userData": {
 *                          "name": "Vinay",
 *                          "role": "trainee",
 *                          "email": "testVinay@succesive.tech",
 *                          "password": "123"
 *                       }
 *                    }
 *     responses:
 *       200:
 *         description: User created
 *         schema:
 *              properties:
 *                  status:
 *                      example: 200 OK
 *                  message:
 *                      example: 'successfully created User'
 *                  data:
 *                      type: object
 *                      allOf:
 *                              - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */
    .post(authMiddleWare(permissions.getUsers, 'create'), validationHandler(validation.create), traineeController.create)
/**
 * @swagger
 *
 * /api/trainee:
 *   put:
 *     description: Update an user
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Trainee
 *     consumes:
 *       - application/json
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: dataToUpdate
 *         description: Data Required for User
 *         in: body
 *         required: true
 *         type: object
 *         example: {
 *                       "originalId": "5fbe2dc2bf231e2dacb1c5c4",
 *                       "dataToUpdate": {
 *                                         "name": "Vinay Updated",
 *                                         "role": "trainee",
 *                                         "email": "testVinay@succesive.tech"
 *                                      }
 *                    }
 *     responses:
 *       200:
 *         description: User updated successfully
 *         schema:
 *              properties:
 *                  status:
 *                      example: 200 OK
 *                  message:
 *                      example: 'successfully updated User'
 *                  data:
 *                      type: object
 *                      allOf:
 *                              - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */
    .put(authMiddleWare(permissions.getUsers, 'write'), validationHandler(validation.update), traineeController.update);
/**
 * @swagger
 *
 * /api/trainee/{id} :
 *  delete:
 *     description: Delete an user
 *     security:
 *       - Bearer: []
 *     tags:
 *       - Trainee
 *     consumes:
 *       - application/json
 *     produces:
 *        - application/json
 *     parameters:
 *       - name: id
 *         description: id of user
 *         in: path
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         schema:
 *              properties:
 *                  status:
 *                      example: 200 OK
 *                  message:
 *                      example: 'successfully deleted User'
 *                  data:
 *                      type: object
 *                      allOf:
 *                              - $ref: '#/definitions/TraineeResponse'
 *       403:
 *         description: unauthorised access
 *         schema:
 *              $ref: '#/definitions/Unauthorized'
 */
traineeRouter.route('/:id').delete(authMiddleWare(permissions.getUsers, 'delete'), validationHandler(validation.delete), traineeController.delete);

export default traineeRouter;