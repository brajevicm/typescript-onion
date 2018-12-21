import { Entity } from '../Kernel/Entity';

export interface User extends Entity {
  id?: number;
  email: string;
  name: string;
}
