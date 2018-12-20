import { serverEnvironment } from './ServerEnvironment';
import { loggerEnvironment } from './LoggerEnvironment';
import { databaseEnvironment } from './DatabaseEnvironment';
import { mailEnvironment } from './MailEnvironment';

// Not being used at the moment, error during validation
export const environment = Object.assign({
  serverEnvironment,
  loggerEnvironment,
  databaseEnvironment,
  mailEnvironment
});
