export interface CacheClient<T> {
  set(key: string, value: T): Promise<void>;
  get(key: string): Promise<T>;
  getAll(...keys: string[]): Promise<T[]>;
}
