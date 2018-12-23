import { Entity } from '../Kernel/Entity';
import { User } from './User';

export interface Article extends Entity {
  id?: number;
  title: string;
  body: string;
  user: Promise<User>;
}
