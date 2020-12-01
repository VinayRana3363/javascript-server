import * as bcrypt from 'bcrypt';
import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';

const userRepository: UserRepository = new UserRepository();
console.log(config.pass, typeof(config.pass));
// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync(config.pass, salt);

// const hash2 = bcrypt.hashSync(config.pass2, salt);

export default async() => {
    await userRepository.count({})
        .then(res => {
            if (res === 0) {
                console.log('Data sending in pregress');
                userRepository.create({ name: 'PersonX', role: 'head-trainer', email: 'testX@succesive.tech', password: config.pass });
                userRepository.create({ name: 'PersonY', role: 'trainee', email: 'testY@succesive.tech', password: config.pass2 });
            }
        })
        .catch(err => console.log(err));
};