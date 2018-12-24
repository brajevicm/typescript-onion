import { inject } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';

import { RepositoryTypes } from '../../../Config/Types/RepositoryTypes';
import { UserRepository } from '../../../Core/Interface/UserRepository';
import { RepositoryImpl } from './RepositoryImpl';
import { UserDto } from '../../../Web/Dto/UserDto';
import { KernelTypes } from '../../../Config/Types/KernelTypes';
import { DatabaseClient } from '../../../Core/Kernel/DatabaseClient';
import { User } from '../../../Core/Interface/User';
import { UserEntity } from '../../../Core/Entity/UserEntity';

@fluentProvide(RepositoryTypes.UserRepository)
  .inSingletonScope()
  .done(true)
export class UserRepositoryImpl extends RepositoryImpl<UserEntity, UserDto>
  implements UserRepository {
  constructor(
    @inject(KernelTypes.DatabaseClient) databaseClient: DatabaseClient
  ) {
    super(databaseClient, UserEntity);
  }

  public async findByEmail(email: string): Promise<User> {
    return this.findOne({ email });
  }

  public async findByEmailAndPassword(
    email: string,
    password: string
  ): Promise<User> {
    return this.findOne({ email, password });
  }
}
