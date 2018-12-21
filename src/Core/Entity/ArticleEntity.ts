import { provide } from 'inversify-binding-decorators';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

import EntityTypes from '../../Config/Types/EntityTypes';
import { Article } from '../Interface/Article';

@Entity('article')
@provide(EntityTypes.Article)
export class ArticleEntity implements Article {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  title: string;

  @Column()
  body: string;
}
