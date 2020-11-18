import { Request, Response, NextFunction } from 'express';
import { userModel } from '../../repositories/user/UserModel';
import * as jwt from 'jsonwebtoken';
import IRequest from '../../IRequest';
import config from '../../config/configuration';
import * as bcrypt from 'bcrypt';

class UserController {

    static instances: UserController;

    static getInstance() {
        if (UserController.instances) {
            return UserController.instances;
        }

        UserController.instances = new UserController();

        return UserController.instances;
    }

    get( req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Inside get function of User Controller');
            res.send({
                message: 'Trainee fatch sucessfully',
                data: [
                    {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
                ]
            });
        } catch (err) {
            console.log('Inside err');
        }
    }

    create( req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Inside post function of User Controller');
            res.send({
                message: 'Trainee created sucessfully',
                data: {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside err');
        }
    }

    update( req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Inside put function of User Controller');
            res.send({
                message: 'Trainee updated sucessfully',
                data: {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside err');
        }
    }

    delete( req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Inside delete function of User Controller');
            res.send({
                message: 'Trainee delete sucessfully',
                data: {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside err');
        }
    }

    login( req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;


            userModel.findOne({'email': email}, (err, result) => {
                if (result) {
                    if ((email === result.email && bcrypt.compareSync(password, result.password))) {
                        console.log('result is', result.password, result.name);
                        console.log(result);
                        const token = jwt.sign({
                            result
                        }, config.secretKey,  { expiresIn: '15m' });
                        console.log(token);
                        res.send({
                            data: token,
                            message: 'Login Permited',
                            status: 200
                        });
                    }
                    else {
                        console.log('database data', result.password, result.email );
                        res.send({
                            message: 'Password Doesnt Match',
                            status: 400
                        });
                    }
                }
                else {
                    res.send({
                        message: 'Email is not Registered',
                        status: 404
                    });
                }
            });
        }
        catch (err) {
            res.send(err);
        }
    }

    me(req: IRequest, res: Response, next: NextFunction) {
        console.log('User' , req.user);
        const user = req.user;
        res.json({
            user
        });
    }
}

export default UserController.getInstance();