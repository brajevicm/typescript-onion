import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ArticleService } from '../Interface/ArticleService';
import { ArticleRepository } from '../Interface/ArticleRepository';
import { ServiceTypes } from '../../Config/Types/ServiceTypes';
import { RepositoryTypes } from '../../Config/Types/RepositoryTypes';
import { Article } from '../Interface/Article';

@provide(ServiceTypes.ArticleService)
export class ArticleServiceImpl implements ArticleService {
  constructor(
    @inject(RepositoryTypes.ArticleRepository)
    private articleRepository: ArticleRepository
  ) {}

  public async getArticle(id: string): Promise<Article> {
    return await this.articleRepository.findById(id);
  }

  public async getArticles(): Promise<Article[]> {
    return await this.articleRepository.findAll();
  }

  public async save(article: Article): Promise<Article> {
    return await this.articleRepository.save(article);
  }
}
