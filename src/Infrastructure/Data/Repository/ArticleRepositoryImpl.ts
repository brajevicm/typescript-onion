import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { RepositoryTypes } from '../../../Config/Types/RepositoryTypes';
import { User } from '../../../Core/Interface/User';
import { UserRepository } from '../../../Core/Interface/UserRepository';
import { UserEntity } from '../../../Core/Entity/UserEntity';
import { KernelTypes } from '../../../Config/Types/KernelTypes';
import { DatabaseClient } from '../../../Core/Kernel/DatabaseClient';
import { RepositoryImpl } from './RepositoryImpl';
import { UserDto } from '../../../Web/Dto/UserDto';

@provide(RepositoryTypes.UserRepository)
export class UserRepositoryImpl extends RepositoryImpl<UserEntity, UserDto>
  implements UserRepository {
  constructor(
    @inject(KernelTypes.DatabaseClient) databaseClient: DatabaseClient
  ) {
    super(databaseClient, UserEntity);
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
