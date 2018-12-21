import { fluentProvide } from 'inversify-binding-decorators';

import { RepositoryTypes } from '../../../Config/Types/RepositoryTypes';
import { ArticleRepository } from '../../../Core/Interface/ArticleRepository';
import { ArticleEntity } from '../../../Core/Entity/ArticleEntity';
import { RepositoryImpl } from './RepositoryImpl';
import { ArticleDto } from '../../../Web/Dto/ArticleDto';
import { inject } from 'inversify';
import { KernelTypes } from '../../../Config/Types/KernelTypes';
import { DatabaseClient } from '../../../Core/Kernel/DatabaseClient';

@fluentProvide(RepositoryTypes.ArticleRepository)
  .inSingletonScope()
  .done(true)
export class ArticleRepositoryImpl
  extends RepositoryImpl<ArticleEntity, ArticleDto>
  implements ArticleRepository {
  constructor(
    @inject(KernelTypes.DatabaseClient) databaseClient: DatabaseClient
  ) {
    super(databaseClient, ArticleEntity.prototype);
  }
}
