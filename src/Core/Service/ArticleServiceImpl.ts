import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';

import { ArticleService } from '../Interface/ArticleService';
import { ArticleRepository } from '../Interface/ArticleRepository';
import { ServiceTypes } from '../../Config/Types/ServiceTypes';
import { RepositoryTypes } from '../../Config/Types/RepositoryTypes';
import { Article } from '../Interface/Article';
import { KernelTypes } from '../../Config/Types/KernelTypes';
import { CacheClient } from '../Kernel/CacheClient';

@provide(ServiceTypes.ArticleService)
export class ArticleServiceImpl implements ArticleService {
  constructor(
    @inject(RepositoryTypes.ArticleRepository)
    private readonly articleRepository: ArticleRepository,
    @inject(KernelTypes.CacheClient) private readonly cacheClient: CacheClient
  ) {}

  public async getArticle(id: number): Promise<Article> {
    const cachedArticle = await this.cacheClient.get(String(id));

    if (cachedArticle) {
      return cachedArticle;
    }

    return await this.articleRepository.findOneById(id);
  }

  public async getArticles(): Promise<Article[]> {
    return await this.articleRepository.findAll();
  }

  public async save(article: Article): Promise<Article> {
    const savedArticle = await this.articleRepository.save(article);
    this.cacheClient.set(String(savedArticle.id), savedArticle);

    return savedArticle;
  }
}
