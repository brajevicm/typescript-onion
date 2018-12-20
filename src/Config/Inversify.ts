import { Container } from 'inversify';
import * as express from 'express';
import { buildProviderModule } from 'inversify-binding-decorators';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as expressSanitized from 'express-sanitize-escape';
import * as bodyParser from 'body-parser';

import './Loader';
import { MiddlewareTypes } from './Types/MiddlewareTypes';

const container = new Container();

/**
 * Middlewares bindings
 */

container
  .bind<express.RequestHandler>(MiddlewareTypes.Sanitize)
  .toConstantValue(expressSanitized.middleware());

container
  .bind<express.RequestHandler>(MiddlewareTypes.Cors)
  .toConstantValue(cors());

container
  .bind<express.RequestHandler>(MiddlewareTypes.JsonParser)
  .toConstantValue(bodyParser.json());

container
  .bind<express.RequestHandler>(MiddlewareTypes.UrlEncodedParser)
  .toConstantValue(bodyParser.urlencoded({ extended: true }));

container
  .bind<express.RequestHandler>(MiddlewareTypes.Morgan)
  .toConstantValue(morgan('combined'));

container
  .bind<express.RequestHandler>(MiddlewareTypes.Helmet)
  .toConstantValue(helmet());

/**
 * Binding concrete implementations with @provide decorator
 */

container.load(buildProviderModule());

export { container };
