import * as joi from 'joi';
import * as dotenv from 'dotenv';

dotenv.config();
const env = Object.assign({}, process.env);

const envVarsSchema = joi
  .object({
    DATABASE_TYPE: joi.string().lowercase(),
    DATABASE_HOST: joi.string(),
    DATABASE_PORT: joi.number(),
    DATABASE_NAME: joi.string(),
    DATABASE_USERNAME: joi.string(),
    DATABASE_PASSWORD: joi.string()
  })
  .required();

const { error, value: envVars } = joi.validate(env, envVarsSchema);

if (error) {
  throw new Error(`Environment variable validation error ${error.message}`);
}

export const databaseEnvironment = {
  database: {
    type: envVars.DATABASE_TYPE,
    host: envVars.DATABASE_HOST,
    port: Number(envVars.DATABASE_PORT),
    name: envVars.DATABASE_NAME,
    username: envVars.DATABASE_USERNAME,
    password: envVars.DATABASE_PASSWORD
  }
};
