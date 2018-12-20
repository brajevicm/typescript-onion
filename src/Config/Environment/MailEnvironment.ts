import * as joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();
const env = Object.assign({}, process.env);

const envVarsSchema = joi
  .object({
    MAIL_HOST: joi.string().default('localhost'),
    MAIL_PORT: joi.number(),
    MAIL_USERNAME: joi.string(),
    MAIL_PASSWORD: joi.string(),
    MAIL_ENABLED: joi
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

export const mailEnvironment = {
  mail: {
    host: envVars.MAIL_HOST,
    port: envVars.MAIL_PORT,
    username: envVars.MAIL_USERNAME,
    password: envVars.MAIL_PASSWORD,
    enabled: envVars.MAIL_ENABLED
  }
};
