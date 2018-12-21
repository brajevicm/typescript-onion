import { CacheClient } from '../../../Core/Kernel/CacheClient';
import { provide } from 'inversify-binding-decorators';
import { KernelTypes } from '../../../Config/Types/KernelTypes';

@provide(KernelTypes.CacheClient)
export class RedisClient<T> implements CacheClient<T> {
  public get(key: string): Promise<T> {
    return undefined;
  }

  public getAll(...keys: string[]): Promise<T[]> {
    return undefined;
  }

  public set(key: string, value: T): Promise<void> {
    return undefined;
  }
}
