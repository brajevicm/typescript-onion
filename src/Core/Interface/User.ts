import { Entity } from '../Kernel/Entity';
import { Article } from './Article';

export interface User extends Entity {
  id?: number;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  articles: Promise<Article[]>;
}
