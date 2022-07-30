const server= require ('./src/routes/index');
 const db = require ('./src/config/db')
const key = require ('./src/config/key')

const Port = process.env.PORT || 5000

db()
    .then(() => {
        console.log('mongo_db database is  connected');
    }).catch(error => {
        console.log(error)
    });

// running the app service

server.listen(Port, () => {
    console.log(`server running in ${process.env.NODE_ENV} mode on port ${Port}`)
})




