import './Loader';

import { Container } from 'inversify';
import { buildProviderModule } from 'inversify-binding-decorators';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as expressSanitized from 'express-sanitize-escape';

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
  .bind<express.RequestHandler>(MiddlewareTypes.UrlEncodedParser)
  .toConstantValue(bodyParser.urlencoded({ extended: true }));

container
  .bind<express.RequestHandler>(MiddlewareTypes.JsonParser)
  .toConstantValue(bodyParser.json());

container
  .bind<express.RequestHandler>(MiddlewareTypes.Morgan)
  .toConstantValue(morgan('dev'));

container
  .bind<express.RequestHandler>(MiddlewareTypes.Helmet)
  .toConstantValue(helmet());

/**
 * Binding concrete implementations with @provide decorator
 */

container.load(buildProviderModule());

export { container };
