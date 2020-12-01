import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import IRequest from '../../IRequest';
import config from '../../config/configuration';
import * as bcrypt from 'bcrypt';
import UserRepository from '../../repositories/user/UserRepository';

class UserController {

    static instances: UserController;

    static getInstance() {
        if (UserController.instances) {
            return UserController.instances;
        }

        UserController.instances = new UserController();

        return UserController.instances;
    }

    userRepository: UserRepository = new UserRepository();


    login = async( req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const result = await this.userRepository.findOne({'email': email});
                if (result) {
                    console.log(result.password, password);
                    console.log(bcrypt.compareSync(result.password, password));
                    if (bcrypt.compareSync(password, result.password)) {
                        console.log('result is', result.password, result.name);
                        console.log(result);
                        const token = jwt.sign({
                            result
                        }, config.secretKey,  { expiresIn: '15m' });
                        console.log(token);
                        res.send({
                            message: 'Login Permited',
                            Token: token,
                            code: 200
                        });
                    }
                    else {
                        console.log('database data', result.password, result.email, email, password );
                        next({
                            message: 'Password Doesnt Match',
                            code: 400
                        });
                    }
                }
                else {
                    next({
                        message: 'Email is not Registered',
                        code: 400
                    });
                }
        }
        catch (err) {
            next({
                error: err,
                code: 404
            });
        }
    }

    me = (req: IRequest, res: Response, next: NextFunction) => {
        console.log('User' , req.user);
        const user = req.user;
        res.json({
            user
        });
    }
}

export default UserController.getInstance();