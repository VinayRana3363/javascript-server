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

    get = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside get function of Trainee Controller');
            // tslint:disable-next-line: prefer-const
            let { skip, limit, sort } = req.query;
            const query = req.body;
            let traineeCount = 0;
            sort = (sort === undefined || sort.length === 0 ) ? 'createdAt' : sort;
            console.log('sort value', sort, typeof(sort), sort.length);
            // tslint:disable-next-line: object-literal-shorthand
            await this.userRepository.find({ ...query }, {}, {skip: Number(skip), limit: Number(limit), sort: { [String(sort)] : -1} })
                .then((resp) => {
                    for (const users of resp) {
                        if (users.role === 'trainee')
                            traineeCount++;
                    }
                    console.log('Response of Repo is', resp);
                    res.send({
                        message: `Trainee fatch sucessfully and the total number of trainees are ${traineeCount}`,
                        data: resp || ''
                    });
                });
        } catch (err) {
            console.log('Inside err');
            res.send({
                message: 'No record found' ,
                code: 404
            });
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside post function of Trainee Controller');
            await this.userRepository.create(req.body)
                .then((resp) => {
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

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside put function of Trainee Controller');
            await this.userRepository.update(req.body.dataToUpdate)
                .then((resp) => {
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

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside delete function of Trainee Controller');
            console.log('id', req.params);
            await this.userRepository.delete(req.params.id)
                .then((resp) => {
                    console.log('Response of Repo is', resp);
                    res.send({
                        message: 'Trainee deleted sucessfully',
                        data: resp
                    });
                })
                .catch((err) => {
                    console.log('enter try catch');
                    console.log(err);
                });
        } catch (err) {
            console.log('enter delete catch');
            console.log('Inside err', err);
        }

    }
}

    export default TraineeController.getInstance();