import { provide } from 'inversify-binding-decorators';

import { Logger } from '../Core/Kernel/Logger';
import { KernelTypes } from '../Config/Types/KernelTypes';

@provide(KernelTypes.Logger)
export class ConsoleLogger implements Logger {
  private readonly isEnabled: boolean = JSON.parse(process.env.LOGGER_ENABLED);

  public logInfo(...message: any[]): void {
    if (this.isEnabled) {
      console.log(...message);
    }
  }

  public logError(message: string): void {
    if (this.isEnabled) {
      throw Error(message);
    }
  }
}
