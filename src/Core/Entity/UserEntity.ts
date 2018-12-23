import { provide } from 'inversify-binding-decorators';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../Interface/User';
import { EntityTypes } from '../../Config/Types/EntityTypes';
import { ArticleEntity } from './ArticleEntity';

@Entity('user')
@provide(EntityTypes.User)
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToMany(type => ArticleEntity, article => article.user)
  articles: Promise<ArticleEntity[]>;
}
