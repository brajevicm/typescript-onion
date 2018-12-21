import { fluentProvide } from 'inversify-binding-decorators';

import { RepositoryTypes } from '../../../Config/Types/RepositoryTypes';
import { UserRepository } from '../../../Core/Interface/UserRepository';
import { UserEntity } from '../../../Core/Entity/UserEntity';
import { RepositoryImpl } from './RepositoryImpl';
import { UserDto } from '../../../Web/Dto/UserDto';
import { inject } from 'inversify';
import { KernelTypes } from '../../../Config/Types/KernelTypes';
import { DatabaseClient } from '../../../Core/Kernel/DatabaseClient';
import { User } from '../../../Core/Interface/User';

@fluentProvide(RepositoryTypes.UserRepository)
  .inSingletonScope()
  .done(true)
export class UserRepositoryImpl extends RepositoryImpl<UserEntity, UserDto>
  implements UserRepository {
  constructor(
    @inject(KernelTypes.DatabaseClient) databaseClient: DatabaseClient
  ) {
    super(databaseClient, UserEntity.prototype);
  }

  public custom(): User[] {
    return [
      {
        id: 1,
        email: 'loremaa@ipsum.com',
        name: 'Lorem'
      },
      {
        id: 2,
        email: 'doloe@sit.com',
        name: 'Dolor'
      }
    ];
  }
}
