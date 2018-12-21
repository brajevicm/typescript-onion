import { User } from './User';
import { Repository } from '../Kernel/Repository';

export interface UserRepository extends Repository<User> {
  findByToken(token: string): Promise<User>;

  findByUsernameAndPassword(username: string, password: string): Promise<User>;
}
