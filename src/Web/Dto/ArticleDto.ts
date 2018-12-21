import { Article } from '../../Core/Interface/Article';

export class ArticleDto implements Article {
  id?: number;
  body: string;
  title: string;
}
