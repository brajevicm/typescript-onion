import { provide } from 'inversify-binding-decorators';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import { User } from '../Interface/User';
import EntityTypes from '../../Config/Types/EntityTypes';

@Entity('user')
@provide(EntityTypes.User)
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;
}
