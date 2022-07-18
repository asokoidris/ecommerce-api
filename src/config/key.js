require('dotenv').config();

const Port = process.env.PORT || 3000;

module.exports = {
  environment: process.env.NODE_ENV,
  port: process.env.PORT,
  domain: process.env.DOMAIN || `http://localhost:${Port}`,
  BCRYPT: process.env.BCRYPT,
  jwt: {
    refresh: process.env.JWT_REFRESH_TOKEN,
    secret: process.env.JWT_SECRET,
    expires: process.env.JWT_EXPIRES || '5d',
    refreshExpires: process.env.JWT_REFRESH_EXPIRES || '30s',
  },
  secretToken: {
    maxTrials: process.env.TOKEN_CODE_MAX_TRIALS || 10,
    expiry: process.env.TOKEN_CODE_EXPIRY || 10, //In Hours
  },
  admin: {
    url: process.env.ADMIN_URL || 'dims',
  },
  database: {
    redis: {
      url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    },
    sql: {
      development: {
        username: 'duser',
        password: 'aLDbaDdWRcjpmq5',
        database: 'dims',
        host: 'dims.database.windows.net',
        dialect: 'mssql',
      },
      test: {
        username: 'duser',
        password: 'aLDbaDdWRcjpmq5',
        database: 'dims',
        host: 'dims.database.windows.net',
        dialect: 'mssql',
      },
      production: {
        dialect: 'mssql',
        use_env_variable: 'CLEARDB_DATABASE_URL',
      },
    },
  },
  email: {
    sendgrid: {
      sender: process.env.SENDGRID_EMAIL_SENDER,
      apiKey: process.env.SENDGRID_API_KEY,
    },
    mailgun: {
      apiKey: process.env.MAILGUN_API_KEY,
      domain: process.env.MAILGUN_DOMAIN,
    },
    from: process.env.EMAIL_FROM || 'noreply@dims.com',
    name: process.env.NAME || 'DIMS',
  },
  uploads: {
    directory: 'uploads',
    maximumFileSize: 10 * 1024 * 1024, // 10 MB,
    uploadUrlPath: '/uploads',
  },
};
