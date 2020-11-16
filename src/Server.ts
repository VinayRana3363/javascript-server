import * as express from 'express';
import * as bodyparser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes';

import mainRouter from './router';
import Databse from './libs/Database';


class Server {
    private app: express.Express;

    constructor(private config) {
        this.app = express();
    }

    get application() {
        return this.app;
    }
    public bootstarp() {
        this.initBodyParser();
        this.setupRoutes();
        return this;
    }

    public setupRoutes() {
        this.app.use((req, res, next) => {
            console.log(req.body);
            next();
        });

        this.app.use('/health-check', (req, res, next) => {
            res.send('I am Ok');
        });


        this.app.use('/api', mainRouter);

        this.app.use(notFoundHandler);

        this.app.use(errorHandler);
    }

    public initBodyParser() {
        this.app.use(bodyparser.json());
    }

    public run() {
        const { PORT, NODE_ENV , MONGO_URL } = this.config;

        Databse.open(MONGO_URL)
            .then((res) => {
                console.log('Succesfully connect with MongoDB');
                this.app.listen(PORT, () => {
                    const message = `|| App is running at port '${PORT}' in '${NODE_ENV}' mode ||`;
                    console.log(message);
                });
            })
            .catch((err) => console.log(err));

        // Databse.close(MONGO_URL, (err) => {
        //     if (err) {
        //         console.log('error occured', err);
        //         return;
        //     }
        //     console.log('Succesfully disconnect with MongoDB');
        // });
        return this;
    }
}

export default Server;