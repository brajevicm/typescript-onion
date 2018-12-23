import { Connection, ConnectionOptions, createConnection } from 'typeorm';
import { inject } from 'inversify';

import { ConfigProvider } from '../../Core/Kernel/ConfigProvider';
import { KernelTypes } from '../../Config/Types/KernelTypes';
import { Logger } from '../../Core/Kernel/Logger';
import { DatabaseClient } from '../../Core/Kernel/DatabaseClient';
import { fluentProvide } from 'inversify-binding-decorators';

@fluentProvide(KernelTypes.DatabaseClient)
  .inSingletonScope()
  .done(true)
export class TypeOrmDatabaseClient implements DatabaseClient {
  private connection: Connection;

  public constructor(
    @inject(KernelTypes.Logger) private readonly logger: Logger,
    @inject(KernelTypes.ConfigProvider)
    private readonly configProvider: ConfigProvider
  ) {}

  public async connect(): Promise<void> {
    try {
      const connection = await createConnection(<ConnectionOptions>{
        type: this.configProvider.type,
        host: this.configProvider.host,
        port: this.configProvider.port,
        database: this.configProvider.database,
        username: this.configProvider.username,
        password: this.configProvider.password,
        entities: [__dirname + '/../../Core/Entity/*{.js,.ts}'],
        synchronize: true
      });

      this.logger.logInfo(
        `Connected to database ${this.configProvider.database}`
      );

      this.connection = connection;
    } catch (e) {
      this.logger.logError(e.message);
    }
  }

  public getConnection(): Connection {
    return this.connection;
  }
}
