import * as express from 'express';
import { interfaces } from 'inversify-express-utils';

import { Logger } from '../../Core/Kernel/Logger';
import { makeMiddleware } from '../../Util/makeMiddleware';

export const unauthorized = (res: express.Response) => {
  res.status(401).send('Unauthorized');
};

export const isAuthenticatedMiddlewareCb = (logger: Logger) => async (
  httpContext: interfaces.HttpContext,
  next: express.NextFunction
) => {
  const isAuthenticated = await httpContext.user.isAuthenticated();
  if (isAuthenticated) {
    next();
  } else {
    unauthorized(httpContext.response);
  }
};

export const IsAuthenticatedMiddleware = makeMiddleware(
  isAuthenticatedMiddlewareCb
);
