import * as express from 'express';
import * as bodyparser from 'body-parser';
import { notFoundHandler, errorHandler } from './libs/routes';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerJsdoc from 'swagger-jsdoc';
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
      console.log('Body data', req.body);
      next();
    });

    this.app.use('/api', mainRouter);

    const options =  {
      swaggerDefinition: {
          info: {
              title: 'Swagger javaScript-API',
              description: 'description: Default available user are: For Head-trainer {"email":"testX@succesive.tech", "password": "123"} and for Trainee {"email":"testY@succesive.tech", "password": "stech@123"}',
              version: '1.0.0',
          },
          securityDefinitions: {
              Bearer: {
              type: 'apiKey',
              name: 'Authorization',
              in: 'headers',
          }
      }
  },
      asePath: '/api',
      swagger: '4.1.5',
      apis: ['./src/controllers/**/routes.ts'],
  };
    const specs = swaggerJsdoc(options);
    console.log('JSDocs', specs);
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(specs, { explorer: true })
    );

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
    const { PORT, NODE_ENV, MONGO_URL } = this.config;

    Databse.open(MONGO_URL)
      .then((res) => {
        console.log('Succesfully connect with MongoDB');
        this.app.listen(PORT, () => {
          const message = `|| App is running at port '${PORT}' in '${NODE_ENV}' mode ||`;
          console.log(message);
        });
      })
      .catch((err) => console.log(err));
    return this;
  }
}

export default Server;
