import { provide } from 'inversify-binding-decorators';

import { ConfigProvider } from '../../Core/Kernel/ConfigProvider';
import { KernelTypes } from '../../Config/Types/KernelTypes';

@provide(KernelTypes.ConfigProvider)
export class MySqlConfigProvider implements ConfigProvider {
  type: any = process.env.DATABASE_TYPE;
  host: string = process.env.DATABASE_HOST;
  port: number = Number(process.env.DATABASE_PORT);
  database: string = process.env.DATABASE_NAME;
  username: string = process.env.DATABASE_USERNAME;
  password: string = process.env.DATABASE_PASSWORD;
}
