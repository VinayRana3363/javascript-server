import * as express from 'express';
import * as bodyparser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes';


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

        this.app.use(notFoundHandler);

        this.app.use(errorHandler);
    }

    public initBodyParser() {
        this.app.use(bodyparser.json());
    }

    public run() {
        const { PORT, NODE_ENV } = this.config;

        this.app.listen(PORT, () => {
            const message = `|| App is running at port '${PORT}' in '${NODE_ENV}' mode ||`;
            console.log(message);
        });
    }
}

export default Server;