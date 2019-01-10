import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request } from 'express';
import {
  BadRequestResult,
  CreatedNegotiatedContentResult,
  JsonResult,
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
    CreatedNegotiatedContentResult<Article> | BadRequestResult | JsonResult
  > {
    if (!(await this.httpContext.user.isAuthenticated())) {
      return this.json('', 401);
    }

    const articleDto = Object.assign(request.body, {
      user: this.httpContext.user.details
    });

    console.log(articleDto);

    const article = await this.articleService.save(articleDto);

    if (!article) {
      return this.badRequest();
    }

    return this.created(request.path, article);
  }

  @httpDelete('/:id')
  public async deleteArticle(request: Request): Promise<any> {
    try {
      const article = await this.articleService.getArticle(request.params.id);
      const deleted = await this.articleService.delete(article);

      if (!deleted) {
        throw new NotFoundException(request.params.id);
      }

      return this.ok();
    } catch (e) {
      return this.notFound();
    }
  }

  @httpPut('/:id')
  public async updateArticle(request: Request): Promise<any> {
    try {
      const article = await this.articleService.getArticle(request.params.id);
      const updatedArticle = Object.assign(article, request.body);
      console.log(updatedArticle);
      const updated = await this.articleService.update(updatedArticle);

      return this.ok(updated);
    } catch (e) {
      console.log(e);
      return this.notFound();
    }
  }
}
