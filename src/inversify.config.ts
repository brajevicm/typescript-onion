import { Container } from 'inversify';
import * as express from 'express';
import { buildProviderModule } from 'inversify-binding-decorators';
import * as morgan from 'morgan';
import helmet = require('helmet');

import { MiddlewareTypes } from './Config/Types/MiddlewareTypes';

import './Config/Loader';

const container = new Container();

container
  .bind<express.RequestHandler>(MiddlewareTypes.Morgan)
  .toConstantValue(morgan('combined'));
container
  .bind<express.RequestHandler>(MiddlewareTypes.Helmet)
  .toConstantValue(helmet());
container.load(buildProviderModule());

export default container;
