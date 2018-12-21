import { User } from './User';

export interface AuthService {
  findUserByToken(token: string | string[]): Promise<User>;

  findUserByUsernameAndPassword(
    username: string,
    password: string
  ): Promise<User>;
}
