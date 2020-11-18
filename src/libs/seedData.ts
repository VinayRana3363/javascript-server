import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';

const userRepository: UserRepository = new UserRepository();
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(config.pass, salt);

const hash2 = bcrypt.hashSync(config.pass2, salt);

export default () => {
    userRepository.count({})
        .then(res => {
            if (res === 0) {
                console.log('Data sending in pregress');
                userRepository.create({ name: 'PersonX', role: 'Head-trainer', email: 'test@succesive.tech', password: hash });
                userRepository.create({ name: 'PersonY', role: 'Trainer', email: 'test@succesive.tech', password: hash2 });
            }
        })
        .catch(err => console.log(err));

};