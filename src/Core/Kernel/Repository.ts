export interface Repository<T> {
  save(entity: T): Promise<T>;

  update(entity: T): Promise<T>;

  delete(entity: T): Promise<T>;

  deleteById(id: number): Promise<T>;

  findOneById(id: number): Promise<T>;

  findManyById(ids: string[]): Promise<T[]>;

  findOne(options: Object): Promise<T>;

  findMany(options: Object): Promise<T[]>;

  findAll(): Promise<T[]>;

  query(queryString: string): Promise<T>;
}
