import dotenv from 'dotenv';
dotenv.config();

const keys = {
  DOMAIN: process.env.DOMAIN || `http://localhost:${process.env.PORT || 8080}`,
  CLIENT_URL: process.env.CLIENT_URL || 'https://smartzee.cx/set-password',
  PORT: process.env.PORT || 8080,
  NODE_ENV: process.env.NODE_ENV || 'development',
  BCRYPT: process.env.BCRYPT || 10,
  ADMIN_URL: process.env.ADMIN_URL || 'admin',
  TOKEN_GENERATION_LIMIT: process.env.TOKEN_GENERATION_LIMIT || 10,
  DATABASE: {
    DEVELOPMENT: {
      CONNECTION_STRING: process.env.LOCAL_DB,
    },
    PRODUCTION: {
      CONNECTION_STRING: process.env.PRODUCTION_DATABASE,
    },
    STAGING: {
      CONNECTION_STRING: process.env.STAGING_DATABASE,
    },
  },
  JWT: {
    REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN || '7d',
    SECRET: process.env.JWT_SECRET || 'secret',
    EXPIRES: process.env.JWT_EXPIRES || '5d',
    REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || '1d',
  },
  SUPER_ADMIN: {
    ID: process.env.SUPER_ADMIN_ID || 'SuperAdmin',
    EMAIL: process.env.SUPER_ADMIN_EMAIL || 'smartzee@gmail.com',
    PHONE: process.env.SUPER_ADMIN_PHONE || '08012345678',
    PASSWORD: process.env.SUPER_ADMIN_PASSWORD || 'password',
    ROLE: process.env.SUPER_ADMIN_ROLE || 'SuperAdmin',
  },
  CLIENT: {
    BASE_URL: process.env.CLIENT_BASE_Url || 'https://smartzee.com',
    SET_PASSWORD_URL: process.env.SET_PASSWORD_URL || 'set-password',
    VERIFICATION_URL: process.env.VERIFICATION_URL || 'verify',
    CHANGE_PASSWORD_URL: process.env.CHANGE_PASSWORD_URL || 'change-password',
    RESET_PASSWORD_URL: process.env.RESET_PASSWORD_URL || 'reset-password',
  },
  VERIFICATION: {
    MAX_TRAILS: process.env.TOKEN_CODE_MAX_TRAILS || 3,
    EXPIRY_TIME: process.env.TOKEN_CODE_EXPIRY || 5, // in minute
  },
  MEDIA: {
    CONFIG: {
      FILE_SIZE: 10 * 1024 * 1024,
      FILES: 10,
      MEDIA_PATH: 'src/media',
    },
    S3_BUCKET_CONFIG: {
      ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID || 'key',
      SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY || 'secret',
      REGION: process.env.AWS_REGION || 'us-east-2',
      BUCKET_NAME: process.env.AWS_BUCKET_NAME || 'smartzee',
    },
  },
  EXTERNAL_API: {
    CONFIG: {
      MAX_RETRY: process.env.MAX_RETRY || 3,
      RETRY_DELAY: process.env.RETRY_DELAY || 2000,
    },
  },
  NOTIFICATION: {
    EMAIL: {
      MAIL_TRAP: {
        HOST: process.env.MAILTRAP_HOST || 'smtp.mailtrap.io',
        PORT: process.env.MAILTRAP_PORT || 2525,
        USERNAME: process.env.MAILTRAP_USERNAME || '87acbe8105d8ef',
        PASSWORD: process.env.MAILTRAP_PASSWORD || '3b0564dd285852',
        SENDER: process.env.MAILTRAP_SENDER || 'hello@smartzee.com',
      },
      SEND_PULSE: {
        ID: process.env.SEND_PULSE_HOST_ID,
        SECRET: process.env.SEND_PULSE_HOST_SECRET,
        GRANT_TYPE: process.env.SEND_PULSE_GRANT_TYPE || 'client_credentials',
        AUTHENTICATION_URL:
          process.env.SEND_PULSE_AUTH_URL ||
          'https://api.sendpulse.com/oauth/access_token',
        SEND_EMAIL_URL:
          process.env.SEND_PULSE_SEND_EMAIL_URL ||
          'https://api.sendpulse.com/smtp/emails',
        FROM: process.env.SEND_PULSE_FROM || 'hello@smartzee.com',
        FROM_NAME: process.env.SEND_PULSE_FROM_NAME || 'smartzee',
      },
    },
    SMS: {
      TERMII: {
        ENDPOINT:
          process.env.TERMII_ENDPOINT || 'https://termii.com/api/sms/send',
        API_KEY: process.env.TERMII_API_KEY,
        SENDER_ID: process.env.TERMII_SENDER_ID || 'smartzee',
        FROM: process.env.TERMII_FROM || 'smartzee',
      },
    },
  },
  FORM: {
    CONTACT_AND_ENQUIRES_REDIRECT_EMAIL:
      process.env.CONTACT_AND_ENQUIRES_FORM_REDIRECT_MAIL ||
      'enquiries@smartzee.com',
    PARTNERSHIP_REDIRECT_MAIL:
      process.env.PARTNERSHIP_FORM_REDIRECT_EMAIL || 'partnership@smartzee.com',
  },
};

export default keys;
