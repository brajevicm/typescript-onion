import { provide } from 'inversify-binding-decorators';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Article } from '../Interface/Article';
import { UserEntity } from './UserEntity';
import { EntityTypes } from '../../Config/Types/EntityTypes';

@Entity('article')
@provide(EntityTypes.Article)
export class ArticleEntity implements Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(type => UserEntity, user => user.articles)
  user: Promise<UserEntity>;
}
