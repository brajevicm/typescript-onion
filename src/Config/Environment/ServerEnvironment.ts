import * as joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();
const env = Object.assign({}, process.env);

const envVarsSchema = joi
  .object({
    SERVER_PORT: joi.number()
  })
  .required();

const { error, value: envVars } = joi.validate(env, envVarsSchema);

if (error) {
  throw new Error(`Environment variable validation error ${error.message}`);
}

export const serverEnvironment = {
  server: {
    port: envVars.SERVER_PORT
  }
};
