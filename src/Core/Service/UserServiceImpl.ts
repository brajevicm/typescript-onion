import { provide } from 'inversify-binding-decorators';

import { UserService } from '../Interface/UserService';
import { User } from '../Interface/User';
import { RepositoryTypes } from '../../Config/Types/RepositoryTypes';
import { inject } from 'inversify';
import { UserRepository } from '../Interface/UserRepository';
import { ServiceTypes } from '../../Config/Types/ServiceTypes';

@provide(ServiceTypes.UserService)
export class UserServiceImpl implements UserService {
  constructor(
    @inject(RepositoryTypes.UserRepository)
    private userRepository: UserRepository
  ) {}

  public custom(): User[] {
    return this.userRepository.custom();
  }

  public async getUser(id: string): Promise<User> {
    return await this.userRepository.findById(id);
  }

  public async getUsers(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  public async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
