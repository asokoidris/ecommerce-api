const express = require('express');
const app = express()
const bodyParser = require('body-parser');



const userAuthRoute = require('../routes/userAuth')
const userRoute = require('../routes/users')
const productRoute = require('../routes/product')
const orderRoute = require ('../routes/orders')
const cartRoute = require ('../routes/carts')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))



app.use('/api/userAuth', userAuthRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/carts', cartRoute)

module.exports = app;