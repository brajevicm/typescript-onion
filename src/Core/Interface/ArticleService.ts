import { Article } from './Article';

export interface ArticleService {
  getArticles(): Promise<Article[]>;

  getArticlesByTitle(title: string): Promise<Article[]>;

  getArticle(id: number): Promise<Article>;

  save(article: Article): Promise<Article>;

  delete(article: Article): Promise<Article>;

  update(article: Article): Promise<Article>;

  deleteById(id: number): Promise<Article>;
}
