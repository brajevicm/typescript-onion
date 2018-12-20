import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Repository } from 'typeorm';

import RepositoryTypes from '../../../Config/Types/RepositoryTypes';
import { User } from '../../../Core/Interface/User';
import { UserRepository } from '../../../Core/Interface/UserRepository';
import { UserEntity } from '../../../Core/Entity/UserEntity';
import { KernelTypes } from '../../../Config/Types/KernelTypes';
import { DatabaseClient } from '../../../Core/Kernel/DatabaseClient';

@provide(RepositoryTypes.UserRepository)
export class UserRepositoryImpl implements UserRepository {
  private static repository: Repository<UserEntity>;

  constructor(
    @inject(KernelTypes.DatabaseClient) databaseClient: DatabaseClient
  ) {
    if (!UserRepositoryImpl.repository) {
      databaseClient
        .connect(UserEntity)
        .then(async connection => {
          UserRepositoryImpl.repository = connection.getRepository(UserEntity);
        })
        .catch(e => console.log(e.message));
    }
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

  public async findAll(): Promise<User[]> {
    return await UserRepositoryImpl.repository.find();
  }

  public async findById(id: string): Promise<User> {
    return await UserRepositoryImpl.repository.findOne(id);
  }

  public async findManyById(ids: string[]): Promise<User[]> {
    return undefined;
  }

  public async save(user: User): Promise<User> {
    return await UserRepositoryImpl.repository.save(user);
  }
}
