import * as jwt from 'jsonwebtoken';
import hasPermissio from '../permissions';
import { userModel } from '../../repositories/user/UserModel';

export default (module, permissionType) => (req, res, next) => {
    try {
        console.log('Module and permission is', module, permissionType);
        console.log('header', req.header('authorization'));
        const token = req.header('authorization');
        const decode = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456').result;
        console.log('decoded user', decode);
        console.log('email nad password', decode.email, decode.password, decode.role);
        userModel.findOne({ email: decode.email, password: decode.password }, (err, result) => {
            if (!result) {
                return next({
                    error: 'User not existing in db',
                    code: 403
                });
            }
            console.log('result is', result.password, result.name);
            console.log(result);
            req.user = decode;
            res.locals.user = decode;
            console.log('User in request', decode);
            if (!hasPermissio(module, permissionType, decode.role)) {
                console.log('database data', result.password, result.email, decode.email, decode.password);
                return next({
                    error: 'Unauthorized User role',
                    code: 403
                });
            }
            return next();
        
        });
    } catch (err) {
        next({
            error: 'Unauthorized',
            code: 403
        });
    }
};