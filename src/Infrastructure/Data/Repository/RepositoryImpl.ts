import { unmanaged } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { Repository as TypeORMRepository } from 'typeorm';

import { Repository } from '../../../Core/Kernel/Repository';
import { RepositoryTypes } from '../../../Config/Types/RepositoryTypes';
import { DatabaseClient } from '../../../Core/Kernel/DatabaseClient';

@fluentProvide(RepositoryTypes.Repository)
  .inSingletonScope()
  .done(true)
export class RepositoryImpl<TEntity, TDto> implements Repository<TEntity> {
  private repository: TypeORMRepository<TEntity>;

  public constructor(
    @unmanaged() databaseClient: DatabaseClient,
    @unmanaged()
    entity: { new (): TEntity }
  ) {
    this.repository = databaseClient.getConnection().getRepository(entity);
  }

  public async save(entity: any): Promise<TEntity> {
    return await this.repository.save(entity);
  }

  public async delete(entity: any): Promise<any> {
    return await this.repository.delete(entity);
  }

  public async deleteById(id: number): Promise<any> {
    return await this.repository.delete(id);
  }

  public async update(entity: any): Promise<TEntity> {
    return await this.repository.save(entity);
  }

  public async findAll(): Promise<TEntity[]> {
    return await this.repository.find();
  }

  public async findOneById(id: number): Promise<TEntity> {
    return await this.repository.findOne(id);
  }

  public async findManyById(ids: string[]): Promise<TEntity[]> {
    return await this.repository.findByIds(ids);
  }

  public async findOne(options: Object): Promise<TEntity> {
    return await this.repository.findOne(options);
  }

  public async findMany(options: Object): Promise<TEntity[]> {
    return await this.repository.find(options);
  }

  public async query(queryString: string): Promise<TEntity> {
    return await this.repository.query(queryString);
  }
}
