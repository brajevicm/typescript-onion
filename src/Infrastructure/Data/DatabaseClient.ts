import { Connection, ConnectionOptions, createConnection } from 'typeorm';

import { ConfigProvider } from '../../Core/Kernel/ConfigProvider';

export class DatabaseClient {
  private static connectionPool: Map<string, Connection> = new Map();

  private constructor() {}

  public static async connect(
    configProvider: ConfigProvider,
    entity: any
  ): Promise<Connection> {
    const name: string = new entity().constructor.name;

    if (DatabaseClient.connectionPool.has(name)) {
      return DatabaseClient.connectionPool.get(name);
    }

    const connection = await createConnection(<ConnectionOptions>{
      name: entity.constructor.name,
      type: configProvider.type,
      host: configProvider.host,
      port: configProvider.port,
      database: configProvider.database,
      username: configProvider.username,
      password: configProvider.password,
      entities: [entity],
      synchronize: true
    });

    if (connection) {
      DatabaseClient.connectionPool.set(name, connection);
      console.log(`Connected to database ${configProvider.database}`);
    }

    return connection;
  }
}
