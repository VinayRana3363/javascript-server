import * as jwt from 'jsonwebtoken';
import hasPermissio from '../permissions';
import { userModel } from '../../repositories/user/UserModel';

export default (module, permissionType) => (req, res, next) => {
    try {
        console.log('Module and permission is', module, permissionType);
        console.log('header', req.header('authorization'));
        const token = req.header('authorization');
        const decode = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456');
        console.log('decoded user', decode);
        console.log('email nad password', decode.result.email, decode.result.password);
        userModel.findOne((err, result) => {
            if (!result)  {
                res.send({
                    message: 'Invalid User',
                    status: 404
                });
            }

            if ((decode.result.email === result.email) && (decode.result.password === result.password)) {
                console.log('result is', result.password, result.name);
                console.log(result);
                req.user = decode.result;
                res.locals.user = decode.result;
                console.log('User in request', decode.result);
                console.log('authozied', hasPermissio(module, permissionType, decode.result.role));
                return next();
            }
                else {
                    console.log('database data', result.password, result.email, decode.email, decode.password );
                    res.send({
                        message: 'Email or Password mismatch',
                        status: 400
                    });
                }
        });
    } catch (err) {
        next({
            error: 'Unauthorized',
            code: 403
        });
    }
};