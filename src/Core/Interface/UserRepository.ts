import { User } from './User';
import { Repository } from '../Kernel/Repository';

export interface UserRepository extends Repository<User> {
  custom(): User[];
}
