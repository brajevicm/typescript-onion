export interface EntityDataMapper<TEntity, TDto> {

    toEntity(dto: TDto): TEntity;

    toDto(entity: TEntity): TDto;
}
