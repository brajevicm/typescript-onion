import { User } from './User';

export interface AuthService {
  login(email: string, password: string): Promise<object>;

  register(user: User): Promise<User>;

  generateToken(user: User): string;

  findUserByToken(token: string): Promise<User>;
}
