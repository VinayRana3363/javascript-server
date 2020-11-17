import { Request, Response, NextFunction } from 'express';
import UserRepository from '../../repositories/user/UserRepository';

class TraineeController {

    static instances: TraineeController;

    static getInstance() {
        if (TraineeController.instances) {
            return TraineeController.instances;
        }

        TraineeController.instances = new TraineeController();

        return TraineeController.instances;
    }

    userRepository: UserRepository = new UserRepository();

    get = ( req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside get function of Trainee Controller');
            this.userRepository.find({deletedAt: undefined}, {}, {})
            .then ((resp) => {
                console.log('Response of Repo is', resp);
                res.send({
                    message: 'Trainee fatch sucessfully',
                    data: resp
                });
            });
        } catch (err) {
            console.log('Inside err');
        }
    }

    create = ( req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside post function of Trainee Controller');
            this.userRepository.create(req.body)
            .then ((resp) => {
                console.log('Response of Repo is', resp);
                res.send({
                    message: 'Trainee fatch sucessfully',
                    data: resp
                });
            });
        } catch (err) {
            console.log('Inside err', err);
        }
    }

    update = ( req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside put function of Trainee Controller');
            this.userRepository.update(req.body)
            .then ((resp) => {
                console.log('Response of Repo is', resp);
                res.send({
                    message: 'Trainee updated sucessfully',
                    data: resp
                });
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log('Inside err', err);
        }
    }

    delete( req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Inside delete function of Trainee Controller');
            const userRepository = new UserRepository();
            console.log('id', req.body);
            userRepository.delete(req.body.id)
            .then ((resp) => {
                console.log('Response of Repo is', resp);
                res.send({
                    message: 'Trainee deleted sucessfully',
                    data: resp
                });
            })
            .catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log('Inside err', err);
        }
    }
}

export default TraineeController.getInstance();