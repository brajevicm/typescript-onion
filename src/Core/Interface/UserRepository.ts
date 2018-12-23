import { Repository } from '../Kernel/Repository';
import { User } from './User';

export interface UserRepository extends Repository<User> {
  findByUsernameAndPassword(username: string, password: string): Promise<User>;
}
