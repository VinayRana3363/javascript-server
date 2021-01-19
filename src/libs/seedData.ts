import UserRepository from '../repositories/user/UserRepository';
import config from '../config/configuration';

const userRepository: UserRepository = new UserRepository();
console.log(config.pass, typeof(config.pass));
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
