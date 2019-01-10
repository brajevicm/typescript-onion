import * as express from 'express';
import { inject, injectable } from 'inversify';
import { BaseMiddleware, interfaces } from 'inversify-express-utils';

import { Logger } from '../Core/Kernel/Logger';
import { KernelTypes } from '../Config/Types/KernelTypes';

export type MiddlewareFactory = (
  logger: Logger
) => (
  httpContext: interfaces.HttpContext,
  next: express.NextFunction
) => Promise<void>;

export const makeMiddleware = (cb: MiddlewareFactory) => {
  class CustomMiddleware extends BaseMiddleware {
    @inject(KernelTypes.Logger) private readonly _logger: Logger;
    public handler(
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ): void {
      (async () => {
        const middleware = cb(this._logger);
        await middleware(this.httpContext, next);
      })();
    }
  }

  return injectable()(CustomMiddleware) as { new (): BaseMiddleware };
};
