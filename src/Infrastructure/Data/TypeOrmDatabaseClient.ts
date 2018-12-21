import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { inject } from 'inversify';

import { ConfigProvider } from '../../Core/Kernel/ConfigProvider';
import { KernelTypes } from '../../Config/Types/KernelTypes';
import { Logger } from '../../Core/Kernel/Logger';
import { DatabaseClient } from '../../Core/Kernel/DatabaseClient';
import { provide } from 'inversify-binding-decorators';

@provide(KernelTypes.DatabaseClient)
export class TypeOrmDatabaseClient implements DatabaseClient {
  private static connectionPool: Map<string, Connection> = new Map();

  public constructor(
    @inject(KernelTypes.Logger) private readonly logger: Logger,
    @inject(KernelTypes.ConfigProvider)
    private readonly configProvider: ConfigProvider
  ) {}

  public async connect(entity: any): Promise<any> {
    const name: string = new entity().constructor.name;

    if (TypeOrmDatabaseClient.connectionPool.has(name)) {
      return TypeOrmDatabaseClient.connectionPool.get(name);
    }

    try {
      const connection = await createConnection(<ConnectionOptions>{
        name: entity.constructor.name,
        type: this.configProvider.type,
        host: this.configProvider.host,
        port: this.configProvider.port,
        database: this.configProvider.database,
        username: this.configProvider.username,
        password: this.configProvider.password,
        entities: [entity],
        synchronize: true
      });

      TypeOrmDatabaseClient.connectionPool.set(name, connection);
      this.logger.logInfo(
        `Connected to database ${this.configProvider.database} with ${name}`
      );

      return connection;
    } catch (e) {
      this.logger.logError(e.message);
    }
  }
}
