import { fluentProvide } from 'inversify-binding-decorators';
import { inject } from 'inversify';

import { RepositoryTypes } from '../../../Config/Types/RepositoryTypes';
import { ArticleRepository } from '../../../Core/Interface/ArticleRepository';
import { RepositoryImpl } from './RepositoryImpl';
import { ArticleDto } from '../../../Web/Dto/ArticleDto';
import { KernelTypes } from '../../../Config/Types/KernelTypes';
import { DatabaseClient } from '../../../Core/Kernel/DatabaseClient';
import { ArticleEntity } from '../../../Core/Entity/ArticleEntity';

@fluentProvide(RepositoryTypes.ArticleRepository)
  .inSingletonScope()
  .done(true)
export class ArticleRepositoryImpl
  extends RepositoryImpl<ArticleEntity, ArticleDto>
  implements ArticleRepository {
  constructor(
    @inject(KernelTypes.DatabaseClient) databaseClient: DatabaseClient
  ) {
    super(databaseClient, ArticleEntity);
  }
}
