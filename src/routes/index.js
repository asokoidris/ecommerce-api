const express = require('express');
const app = express()
const bodyParser = require('body-parser');
const helmet = require ('helmet');
const cors = require ('cors');
const morgan = require ('morgan')


const userAuthRoute = require('../routes/userAuth')
const userRoute = require('../routes/users')
const productRoute = require('../routes/product')
const orderRoute = require ('../routes/orders')
const cartRoute = require ('../routes/carts')


app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())
app.use(cors())



app.use('/api/userAuth', userAuthRoute)
app.use('/api/user', userRoute)
app.use('/api/products', productRoute)
app.use('/api/orders', orderRoute)
app.use('/api/carts', cartRoute)

module.exports = app;