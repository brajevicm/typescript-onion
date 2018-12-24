import { Repository } from '../Kernel/Repository';
import { User } from './User';

export interface UserRepository extends Repository<User> {
  findByEmailAndPassword(email: string, password: string): Promise<User>;

  findByEmail(email: string): Promise<User>;
}
