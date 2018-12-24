import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

import { ServiceTypes } from '../../Config/Types/ServiceTypes';
import { AuthService } from '../Interface/AuthService';
import { User } from '../Interface/User';
import { RepositoryTypes } from '../../Config/Types/RepositoryTypes';
import { UserRepository } from '../Interface/UserRepository';

@provide(ServiceTypes.AuthService)
export class AuthServiceImpl implements AuthService {
  constructor(
    @inject(RepositoryTypes.UserRepository)
    private readonly userRepository: UserRepository
  ) {}

  public async register(user: User): Promise<User> {
    user.password = bcrypt.hashSync(user.password, 10);

    return await this.userRepository.save(user);
  }

  public generateToken(user: User): any {
    return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
  }

  public async findUserByToken(token: string): Promise<User> {
    if (!token) {
      return undefined;
    }

    if (token.startsWith('Bearer ')) {
      token = token.replace('Bearer ', '');
    }

    try {
      const authToken: any = await jwt.verify(token, process.env.JWT_SECRET);

      return await this.userRepository.findOneById(authToken.id);
    } catch (e) {
      return await undefined;
    }
  }

  public async login(email: string, password: string): Promise<object> {
    const user = await this.userRepository.findByEmail(email);
    const isValidPassword = bcrypt.compareSync(password, user.password);

    return isValidPassword ? { token: this.generateToken(user) } : undefined;
  }
}
