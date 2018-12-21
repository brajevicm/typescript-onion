import {
  BaseHttpController,
  controller,
  httpGet,
  httpPost
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import {
  BadRequestErrorMessageResult,
  CreatedNegotiatedContentResult,
  NotFoundResult,
  OkNegotiatedContentResult
} from 'inversify-express-utils/dts/results';

import { ArticleService } from '../../Core/Interface/ArticleService';
import { Article } from '../../Core/Interface/Article';
import { ServiceTypes } from '../../Config/Types/ServiceTypes';
import { NotFoundException } from '../Exception/NotFoundException';

@controller('/articles')
export class ArticleController extends BaseHttpController {
  constructor(
    @inject(ServiceTypes.ArticleService)
    private readonly articleService: ArticleService
  ) {
    super();
  }

  @httpGet('/')
  public async getArticles(): Promise<Article[]> {
    return await this.articleService.getArticles();
  }

  @httpGet('/:id')
  public async getArticle(
    request: Request
  ): Promise<NotFoundResult | OkNegotiatedContentResult<Article>> {
    try {
      const article = await this.articleService.getArticle(request.params.id);
      if (!article) {
        throw new NotFoundException(request.params.id);
      }

      return this.ok(article);
    } catch (e) {
      console.log(e.message);
      return this.notFound();
    }
  }

  @httpPost('/')
  public async newArticle(
    request: Request
  ): Promise<
    CreatedNegotiatedContentResult<Article> | BadRequestErrorMessageResult
  > {
    try {
      const article = await this.articleService.save(request.body);
      if (!article) {
        throw Error('not created');
      }
      return this.created(request.path, article);
    } catch (e) {
      return this.badRequest(e.message);
    }
  }
}
