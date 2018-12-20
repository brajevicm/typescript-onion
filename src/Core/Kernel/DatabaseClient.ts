export interface DatabaseClient {
  connect(entity: any): Promise<any>;
}
