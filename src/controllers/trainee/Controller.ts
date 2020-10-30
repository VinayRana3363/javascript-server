import { Request, Response, NextFunction } from 'express';

class TraineeController {

    static instances: TraineeController;

    static getInstance() {
        if (TraineeController.instances) {
            return TraineeController.instances;
        }

        TraineeController.instances = new TraineeController();

        return TraineeController.instances;
    }

    get( req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Inside get function of Trainee Controller');
            res.send({
                message: 'Trainee fatch sucessfully',
                data: [
                    {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
                ]
            });
        } catch (err) {
            console.log('Inside err');
        }
    }

    create( req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Inside post function of Trainee Controller');
            res.send({
                message: 'Trainee created sucessfully',
                data: {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside err');
        }
    }

    update( req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Inside put function of Trainee Controller');
            res.send({
                message: 'Trainee updated sucessfully',
                data: {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside err');
        }
    }

    delete( req: Request, res: Response, next: NextFunction) {
        try {
            console.log('Inside delete function of Trainee Controller');
            res.send({
                message: 'Trainee delete sucessfully',
                data: {
                        name: 'Trainee1',
                        address: 'Noida'
                    }
            });
        } catch (err) {
            console.log('Inside err');
        }
    }
}

export default TraineeController.getInstance();