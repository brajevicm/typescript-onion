export interface Logger {
  logInfo(...message: any[]): void;

  logError(message: string): void;
}
