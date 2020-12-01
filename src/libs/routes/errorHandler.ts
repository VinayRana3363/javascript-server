import { Request, Response, NextFunction } from 'express';

export default (err, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
    res.status(err.code).json(
        {
            Errors: err
        }
    );
};
