export interface Logger {
  logInfo(...message: Array<any>): void;

  logError(message: string): void;
}
