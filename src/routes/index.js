const express = require('express');
const app = express()
const bodyParser = require('body-parser');

const userAuthRoutes = require('../routes/userAuth')
const userRoutes = require('../routes/users')
const productRoutes = require ('../model/products')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))




app.use('/api/userAuth', userAuthRoutes)
app.use('/api/users', userRoutes)
app.use('/api/products', productRoutes)


module.exports = app;