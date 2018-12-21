import { fluentProvide } from 'inversify-binding-decorators';

import { KernelTypes } from '../../../Config/Types/KernelTypes';
import { CacheClient } from '../../../Core/Kernel/CacheClient';
import { createHandyClient, IHandyRedis } from 'handy-redis';

@fluentProvide(KernelTypes.CacheClient)
  .inSingletonScope()
  .done(true)
export class CacheClientImpl implements CacheClient {
  private readonly client: IHandyRedis;

  constructor() {
    this.client = createHandyClient({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT)
    });
  }

  public async get(key: string): Promise<any> {
    return JSON.parse(await this.client.get(key));
  }

  public getAll(key: string): Promise<any[]> {
    return this.client.hgetall(key);
  }

  public async set(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }
}
