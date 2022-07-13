require('dotenv').config();

module.exports = {
    TEST_DB: process.env.TEST_DB,
    DATA_DB: process.env.DATABASE_URI,
    JWT_SEC: process.env.JWT_SEC
};