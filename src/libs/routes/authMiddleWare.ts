import * as jwt from 'jsonwebtoken';
import hasPermissio from '../permissions';

export default (module, permissionType) => (req, res, next) => {
    try {
        console.log('Module and permission is', module, permissionType);
        console.log('header', req.header('authorization'));
        const token = req.header('authorization');
        const decode = jwt.verify(token, 'qwertyuiopasdfghjklzxcvbnm123456');
        console.log('decoded user', decode);
        console.log('authozied', hasPermissio(module, permissionType, decode.Role));
        next();
    } catch (err) {
        next({
            error: 'Unauthorized',
            code: 403
        });
    }
};