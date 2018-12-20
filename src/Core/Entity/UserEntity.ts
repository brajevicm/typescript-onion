import { provide } from 'inversify-binding-decorators';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { User } from '../Interface/User';
import Types from '../../Web/Server/Types';

@Entity('user')
@provide(Types.User)
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;
}
