import * as secret from './secret';

const env = require('./env')[String(secret.ENVIRONMENT)];

const { database } = env;


const EnvHelper = {
  getDatabase() {
    return database;
  },
};

export default EnvHelper;
