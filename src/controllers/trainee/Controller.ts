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
            let { skip, limit, sort, search } = req.query;
            let query;
            sort = (sort === undefined || sort.length === 0) ? 'createdAt' : sort;
            if (!(search === undefined || search.length === 0)) {
                const regex = /\S+@\S+\.\S+/;
                query = (regex.test(String(search))) ? { email: search } : { name: search };
            }
            console.log('sort value', sort, typeof (sort), sort.length, query);
            // tslint:disable-next-line: object-literal-shorthand
            const trainee = await this.userRepository.find({ ...query }, {}, { skip: Number(skip), limit: Number(limit), sort: { [String(sort)]: -1 }, collation: { locale: 'en' } });
            const traineeCount = await this.userRepository.count({ role: 'trainee' });
            if (trainee) {
                console.log('Response of Repo is', trainee);
                res.send({
                    message: `Trainee fatch sucessfully`,
                    TotalCount: trainee.length,
                    TraineeCount: traineeCount,
                    data: trainee
                });
            }
            else {
                next({
                    message: 'No record found',
                    code: 404
                });
            }
        } catch (err) {
            console.log('Inside err', err);
            next({
                message: 'No record found',
                code: 404
            });
        }
    }

    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside post function of Trainee Controller');
            const trainee = await this.userRepository.create(req.body.userData);
            if (trainee) {
                console.log('Response of Repo is', trainee);
                res.send({
                    message: 'Trainee fatch sucessfully',
                    data: trainee
                });
            }
        } catch (err) {
            console.log('Inside err', err);
        }
    }

    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside put function of Trainee Controller');
            const dataToUpdate = {
                'originalId': req.body.originalId,
                'dataToUpdate': req.body.dataToUpdate
            };
            const trainee = await this.userRepository.update(dataToUpdate);
            if (trainee) {
                console.log('Response of Repo is', trainee);
                res.send({
                    message: 'Trainee updated sucessfully',
                    data: trainee,
                    code: 200
                });
            }
        } catch (err) {
            console.log('Inside err', err);
        }
    }

    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('Inside delete function of Trainee Controller');
            console.log('id', req.params);
            const trainee = await this.userRepository.delete(req.params.id);
            if (trainee) {
                console.log('Response of Repo is', trainee );
                res.send({
                    message: 'Trainee deleted sucessfully',
                    data: trainee
                });
            }
        } catch (err) {
            console.log('Inside err', err);
        }

    }
}

export default TraineeController.getInstance();