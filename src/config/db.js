const mongoose = require('mongoose');
const { TEST_DB, DATA_DB } = require('./key');

let mongoUrl = null;


const mongoConnection = () => {
    if (process.env.NODE_ENV === 'development') {
        mongoUrl ='mongodb://localhost:27017/ecommerce-api'
    } else {
        mongoUrl = TEST_DB;
    }
    return mongoose.connect(mongoUrl);
}

module.exports = mongoConnection;

