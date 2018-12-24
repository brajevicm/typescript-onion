import { interfaces } from 'inversify-express-utils';
import { provide } from 'inversify-binding-decorators';

import { WebTypes } from '../../Config/Types/WebTypes';

@provide(WebTypes.Principal)
export class Principal implements interfaces.Principal {
  constructor(public details: any) {}

  // @TODO
  public async isAuthenticated(): Promise<boolean> {
    return await !!this.details;
  }

  // @TODO
  public async isInRole(role: string): Promise<boolean> {
    return await true;
  }

  // @TODO
  public async isResourceOwner(resourceId: any): Promise<boolean> {
    return await true;
  }
}
