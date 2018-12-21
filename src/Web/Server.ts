import { Container } from 'inversify';
import { getRouteInfo, InversifyExpressServer } from 'inversify-express-utils';
import * as express from 'express';

import { MiddlewareTypes } from '../Config/Types/MiddlewareTypes';
import { AuthProvider } from './Security/AuthProvider';

export class Server {
  public start(container: Container): void {
    const server: InversifyExpressServer = new InversifyExpressServer(
      container,
      null,
      null,
      null,
      AuthProvider
    );

    server.setConfig((app: express.Application) => {
      app.use(
        container.get<express.RequestHandler>(MiddlewareTypes.UrlEncodedParser)
      );
      app.use(
        container.get<express.RequestHandler>(MiddlewareTypes.JsonParser)
      );
      app.use(container.get<express.RequestHandler>(MiddlewareTypes.Helmet));
      app.use(container.get<express.RequestHandler>(MiddlewareTypes.Morgan));
      app.use(container.get<express.RequestHandler>(MiddlewareTypes.Sanitize));
      app.use(container.get<express.RequestHandler>(MiddlewareTypes.Cors));
    });

    server.build().listen(Number(process.env.SERVER_PORT), () => {
      if (JSON.parse(process.env.LOGGER_ENABLED)) {
        const routeInfo = getRouteInfo(container);

        console.log(JSON.stringify({ routes: routeInfo }, null, 2));
        console.log(`Server started on port ${process.env.SERVER_PORT}`);
      }
    });
  }
}
