import { ConfigProvider } from '../../Core/Kernel/ConfigProvider';

export class TypeOrmConfigProvider implements ConfigProvider {
  type: any = 'mysql';
  host: string = 'mysql';
  port: number = 3306;
  database: string = 'test-db';
  username: string = 'root';
  password: string = 'root';
}
