import { User } from './User';

export interface UserService {
  getUsers(): Promise<User[]>;

  getUser(id: number): Promise<User>;

  save(user: User): Promise<User>;
}
