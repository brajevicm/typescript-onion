import { Connection } from 'typeorm';

export interface DatabaseClient {
  connect(): Promise<void>;

  getConnection(): Connection | any;
}
