import { Article } from './Article';

export interface ArticleService {
  getArticles(): Promise<Article[]>;

  getArticle(id: string): Promise<Article>;

  save(user: Article): Promise<Article>;
}
