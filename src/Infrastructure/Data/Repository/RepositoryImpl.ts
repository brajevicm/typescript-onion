import {inject} from "inversify";
import {provide} from "inversify-binding-decorators";
import {Repository as TypeOrmRepository} from "typeorm";

import Types from "../../../Web/Assembler/Types";
import {Query, Repository} from "../../../Core/Kernel/Repository";

@provide(Types.Repository)
export class RepositoryImpl<TEntity, TDto> implements Repository<TEntity> {

    private readonly repository: TypeOrmRepository<TEntity>;

    public constructor(
        @inject(Types.TypeOrmRepository) repository: TypeOrmRepository<TEntity>
    ) {
        this.repository = repository;
    }

    public async findAll(): Promise<TEntity[]> {
        return await this.repository.find();
    }

    public async findById(id: string): Promise<TEntity> {
        console.log(this.repository);
        return await this.repository.findOne(id);
    }

    public async findManyById(ids: string[]): Promise<TEntity[]> {
        return undefined;
    }

    public async findManyByQuery(query?: Query<TEntity>): Promise<TEntity[]> {
        return undefined;
    }

    public async save(doc: TEntity): Promise<TEntity> {
        return undefined;
    }
}
