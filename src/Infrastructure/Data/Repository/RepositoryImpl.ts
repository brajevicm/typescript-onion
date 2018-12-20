// import {provide} from "inversify-binding-decorators";
// import {getConnection, Repository as TypeORMRepository} from "typeorm";
//
// import RepositoryTypes from "../../../Web/Config/RepositoryTypes";
// import {Query, Repository} from "../../../Core/Kernel/Repository";
//
// @provide(RepositoryTypes.Repository)
// export class RepositoryImpl<TEntity, TDto> implements Repository<TEntity> {
//     private repository: TypeORMRepository<TEntity>;
//
//     public constructor(
//     ) {
//         this.repository = getConnection().getRepository(TEntity);
//     }
//
//     public async findAll(): Promise<TEntity[]> {
//         const entities = await this.repository.find();
//         return entities;
//         // return entities.map(entity => this.dataMapper.toDto(entity))
//     }
//
//     public async findById(id: string): Promise<TEntity> {
//         const entity = await this.repository.findOne(id);
//         return entity;
//         // return this.dataMapper.toDto(entity);
//     }
//
//     public async findManyById(ids: string[]): Promise<TEntity[]> {
//         return undefined;
//     }
//
//     public async findManyByQuery(query?: Query<TEntity>): Promise<TEntity[]> {
//         return undefined;
//     }
//
//     public async save(doc: TEntity): Promise<TEntity> {
//         return undefined;
//     }
// }
