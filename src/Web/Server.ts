import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import { MiddlewareTypes } from '../Config/Types/MiddlewareTypes';

export class Server {
  public start(container: Container): void {
    const server = new InversifyExpressServer(container);
    server.setConfig(app => {
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      app.use(bodyParser.json());
      app.use(container.get<express.RequestHandler>(MiddlewareTypes.Helmet));
      // app.use(container.get<express.RequestHandler>(MiddlewareTypes.Morgan));
    });

    const app = server.build();

    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  }
}
