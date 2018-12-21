import { provide } from 'inversify-binding-decorators';

import { ServiceTypes } from '../../Config/Types/ServiceTypes';
import { AuthService } from '../Interface/AuthService';
import { User } from '../Interface/User';
import { inject } from 'inversify';
import { RepositoryTypes } from '../../Config/Types/RepositoryTypes';
import { UserRepository } from '../Interface/UserRepository';

@provide(ServiceTypes.AuthService)
export class AuthServiceImpl implements AuthService {
  constructor(
    @inject(RepositoryTypes.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  // @TODO
  public async findUserByToken(token: string): Promise<User> {
    const id = 1;
    return await this.userRepository.findOneById(id);
  }

  // @TODO
  public async findUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User> {
    const hashedPassword = password + 1;

    return await this.userRepository.findByUsernameAndPassword(
      username,
      hashedPassword
    );
  }
}
