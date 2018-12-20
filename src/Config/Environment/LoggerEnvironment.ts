import * as joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();
const env = Object.assign({}, process.env);

const envVarsSchema = joi
  .object({
    LOGGER_LEVEL: joi
      .string()
      .allow(['error', 'warn', 'info', 'verbose', 'debug'])
      .default('info'),
    LOGGER_ENABLED: joi
      .boolean()
      .truthy('TRUE')
      .truthy('true')
      .falsy('FALSE')
      .falsy('false')
  })
  .required();

const { error, value: envVars } = joi.validate(env, envVarsSchema);

if (error) {
  throw new Error(`Environment variable validation error ${error.message}`);
}

export const loggerEnvironment = {
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  }
};

// [('NODE_ENV', 'PORT')].forEach(name => {
//   if (!process.env[name]) {
//     throw new Error(`Environment variable ${name} is missing.`);
//   }
// });

// export const config = {
//   env: process.env.NODE_ENV,
//   logger: {
//     level: process.env.LOG_LEVEL || 'info',
//     enabled: process.env.BOOLEAN
//       ? process.env.BOOLEAN.toLowerCase() === 'true'
//       : false
//   },
//   server: {
//     port: Number(process.env.PORT)
//   },
//   database: {}
// };
