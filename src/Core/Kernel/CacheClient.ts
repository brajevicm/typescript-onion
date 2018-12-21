export interface CacheClient {
  set(key: string, value: any): Promise<void>;
  get(key: string): Promise<any>;
  getAll(key: string): Promise<any[]>;
}
