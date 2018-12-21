import { Entity } from '../Kernel/Entity';

export interface Article extends Entity {
  id?: number;
  title: string;
  body: string;
}
