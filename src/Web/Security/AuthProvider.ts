import * as express from 'express';
import { interfaces } from 'inversify-express-utils';
import { inject, injectable } from 'inversify';

import { ServiceTypes } from '../../Config/Types/ServiceTypes';
import { AuthService } from '../../Core/Interface/AuthService';
import { Principal } from './Principal';

@injectable()
export class AuthProvider implements interfaces.AuthProvider {
  @inject(ServiceTypes.AuthService)
  private readonly authService: AuthService;

  // @TODO
  public async getUser(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<interfaces.Principal> {
    const token = req.headers.authorization;
    const user = await this.authService.findUserByToken(token);

    return new Principal(user);
  }
}
