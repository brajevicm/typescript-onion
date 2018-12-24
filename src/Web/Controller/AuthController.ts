import {
  BaseHttpController,
  controller,
  httpPost
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import {
  BadRequestResult,
  CreatedNegotiatedContentResult,
  NotFoundResult,
  OkNegotiatedContentResult
} from 'inversify-express-utils/dts/results';

import { ServiceTypes } from '../../Config/Types/ServiceTypes';
import { AuthService } from '../../Core/Interface/AuthService';
import { User } from '../../Core/Interface/User';
import { UserService } from '../../Core/Interface/UserService';

@controller('/auth')
export class AuthController extends BaseHttpController {
  constructor(
    @inject(ServiceTypes.AuthService) private readonly authService: AuthService,
    @inject(ServiceTypes.UserService) private readonly userService: UserService
  ) {
    super();
  }

  @httpPost('/register')
  public async register(
    request: Request
  ): Promise<CreatedNegotiatedContentResult<User> | BadRequestResult> {
    try {
      const user = this.authService.register(request.body);

      return this.created(request.path, user);
    } catch (e) {
      return this.badRequest();
    }
  }

  @httpPost('/login')
  public async login(
    request: Request
  ): Promise<
    OkNegotiatedContentResult<User> | NotFoundResult | BadRequestResult
  > {
    if (!this.userService.findByEmail(request.body.email)) {
      return this.notFound();
    }

    const token = await this.authService.login(
      request.body.email,
      request.body.password
    );

    if (!token) {
      return this.badRequest();
    }

    console.log(token);

    return this.ok(token);
  }
}
