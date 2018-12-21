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

  public async save(entity: any): Promise<TEntity> {
    return await this.repository.save(entity);
  }

  // @TODO
  public async delete(entity: TEntity): Promise<TEntity> {
    return undefined;
  }

  // @TODO
  public async deleteById(id: number): Promise<TEntity> {
    return undefined;
  }

  // @TODO
  public async update(entity: TEntity): Promise<TEntity> {
    return undefined;
  }

  // @TODO
  public async findAll(): Promise<TEntity[]> {
    return await this.repository.find();
  }

  // @TODO
  public async findOneById(id: number): Promise<TEntity> {
    return await this.repository.findOne(id);
  }

  // @TODO
  public async findManyById(ids: string[]): Promise<TEntity[]> {
    return undefined;
  }

  // @TODO
  public async findOne(options: Object): Promise<TEntity> {
    // return await this.repository.find(options);
    return undefined;
  }

  public async findMany(options: Object): Promise<TEntity[]> {
    return undefined;
  }

  public async query(queryString: string): Promise<TEntity> {
    return undefined;
  }
}
