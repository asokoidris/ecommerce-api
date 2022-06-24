const mongoose = require('mongoose');
const { TEST_DB, DATA_DB } = require('./key');

let mongoUrl = null;


const mongoConnection = () => {
    if (process.env.NODE_ENV === 'development') {
        mongoUrl = 'mongodb+srv://akinade:xVWhvQp9HUfrDFkP@cluster0.alh61.mongodb.net/ecommerce-api?retryWrites=true&w=majority' ;
    } else {
        mongoUrl = TEST_DB;
    }
    return mongoose.connect(mongoUrl);
}

module.exports = mongoConnection;

