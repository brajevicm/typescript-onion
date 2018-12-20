import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import {
  BadRequestErrorMessageResult,
  CreatedNegotiatedContentResult,
  NotFoundResult,
  OkNegotiatedContentResult
} from 'inversify-express-utils/dts/results';

import { UserService } from '../../Core/Interface/UserService';
import { User } from '../../Core/Interface/User';
import { UserNotFoundException } from '../Exception/UserNotFoundException';
import ServiceTypes from '../../Config/Types/ServiceTypes';

@controller('/users')
export class UserController extends BaseHttpController {
  constructor(
    @inject(ServiceTypes.UserService) private readonly userService: UserService
  ) {
    super();
  }

  @httpGet('/custom')
  public getCustom(): User[] {
    return this.userService.custom();
  }

  @httpGet('/')
  public async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @httpGet('/:id')
  public async getUser(
    request: Request
  ): Promise<NotFoundResult | OkNegotiatedContentResult<User>> {
    try {
      const user = await this.userService.getUser(request.params.id);
      if (!user) {
        throw new UserNotFoundException(request.params.id);
      }

      return this.ok(user);
    } catch (e) {
      console.log(e.message);
      return this.notFound();
    }
  }

  @httpPost('/')
  public async newUser(
    request: Request
  ): Promise<
    CreatedNegotiatedContentResult<User> | BadRequestErrorMessageResult
  > {
    try {
      const user = await this.userService.save(request.body);
      if (!user) {
        throw Error('not created');
      }
      return this.created(request.path, user);
    } catch (e) {
      return this.badRequest(e.message);
    }
  }

  //
  // @httpPut('/:id')
  // public updateUser(request: Request): User {
  //     return this.userService.updateUser(request.params.id, request.body);
  // }
  //
  // @httpDelete('/:id')
  // public deleteUser(request: Request): string {
  //     return this.userService.deleteUser(request.params.id);
  // }
}
