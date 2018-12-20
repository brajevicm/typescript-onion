import 'reflect-metadata';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { buildProviderModule } from 'inversify-binding-decorators';
import * as bodyParser from 'body-parser';

import './Loader';

export class Server {
  public start(): void {
    this.startExpressServer();
  }

  private startExpressServer(): void {
    const container = new Container();
    container.load(buildProviderModule());

    const server = new InversifyExpressServer(container);
    server.setConfig(app => {
      app.use(
        bodyParser.urlencoded({
          extended: true
        })
      );
      app.use(bodyParser.json());
    });

    const app = server.build();
    app.listen(3000, () => {
      console.log('Server started on port 3000 :)');
    });
  }
}
