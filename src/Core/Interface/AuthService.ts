import { User } from './User';

export interface AuthService {
  generateToken(user): any;

  findUserByToken(token: string | string[]): Promise<User>;

  findUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User>;
}
