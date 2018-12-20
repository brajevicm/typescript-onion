import { User } from './User';

export interface UserService {
  getUsers(): Promise<User[]>;

  getUser(id: string): Promise<User>;

  custom(): User[];

  save(user: User): Promise<User>;
}
