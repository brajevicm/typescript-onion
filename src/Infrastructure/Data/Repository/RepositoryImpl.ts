import { unmanaged } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Repository as TypeORMRepository } from 'typeorm';

import { Repository } from '../../../Core/Kernel/Repository';
import { RepositoryTypes } from '../../../Config/Types/RepositoryTypes';
import { DatabaseClient } from '../../../Core/Kernel/DatabaseClient';

@provide(RepositoryTypes.Repository)
export class RepositoryImpl<TEntity, TDto> implements Repository<TEntity> {
  private repository: TypeORMRepository<TEntity>;

  public constructor(
    @unmanaged() databaseClient: DatabaseClient,
    @unmanaged() entity: TEntity
  ) {
    databaseClient
      .connect(entity.constructor)
      .then(async connection => {
        this.repository = connection.getRepository(entity.constructor);
      })
      .catch(e => console.log(e.message));
  }

  public async findAll(): Promise<TEntity[]> {
    return await this.repository.find();
  }

  public async findById(id: string): Promise<TEntity> {
    return await this.repository.findOne(id);
  }

  public async findManyById(ids: string[]): Promise<TEntity[]> {
    return undefined;
  }

  public async save(entity: any): Promise<TEntity> {
    return await this.repository.save(entity);
  }
}
