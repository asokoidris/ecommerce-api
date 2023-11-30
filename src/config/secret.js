import fs from 'fs';
import dotenv from 'dotenv';
import Logger from './logger'; // Import the Logger class

const logger = Logger.createLogger({});
/** @description Check for the existence of a .env file and load its environment variables
 */
if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
}

/**
 * @description Check if a value is undefined, log an error if it is, and exit the process with an error code
 * @param {string} secret - The value to check
 * @param {string} name - The name of the value (for error logging)
 * @returns {string} - The value if it's defined
 */
function throwIfUndefined(secret, name) {
  if (!secret) {
    logger.log(`${name} must not be undefined`);
    return process.exit(1);
  }
  return secret;
}

/**
 * @description Ensure that NODE_ENV is defined
 */
export const ENVIRONMENT = throwIfUndefined(process.env.NODE_ENV, 'NODE_ENV');

/**
 * @description Ensure that LOCAL_DB is defined
 */
throwIfUndefined(process.env.LOCAL_DB, 'LOCAL_DB');

/**
 * @description Ensure that PRODUCTION_DATABASE is defined
 */
throwIfUndefined(process.env.PRODUCTION_DATABASE, 'PRODUCTION_DATABASE');

/**
 * @description Ensure that STAGING_DATABASE is defined
 */
throwIfUndefined(process.env.STAGING_DATABASE, 'STAGING_DATABASE');

export const SEND_PULSE_HOST_ID = throwIfUndefined(
  process.env.SEND_PULSE_HOST_ID,
  'SEND_PULSE_HOST_ID'
);
export const SEND_PULSE_HOST_SECRET = throwIfUndefined(
  process.env.SEND_PULSE_HOST_SECRET,
  'SEND_PULSE_HOST_SECRET'
);
export const SEND_PULSE_GRANT_TYPE = throwIfUndefined(
  process.env.SEND_PULSE_GRANT_TYPE,
  'SEND_PULSE_GRANT_TYPE'
);
export const AWS_ACCESS_KEY_ID = throwIfUndefined(
  process.env.AWS_ACCESS_KEY_ID,
  'AWS_ACCESS_KEY_ID'
);
export const AWS_SECRET_ACCESS_KEY = throwIfUndefined(
  process.env.AWS_SECRET_ACCESS_KEY,
  'AWS_SECRET_ACCESS_KEY'
);
export const AWS_REGION = throwIfUndefined(
  process.env.AWS_REGION,
  'AWS_REGION'
);
export const AWS_BUCKET_NAME = throwIfUndefined(
  process.env.AWS_BUCKET_NAME,
  'AWS_BUCKET_NAME'
);
