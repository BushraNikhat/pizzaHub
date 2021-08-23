// dependencies
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Emitter = require('events');
require('dotenv').config({path:path.join(__dirname,"./config.env")});
const authRoute=require("./src/routes/authRouter")
const homeRoute=require("./src/routes/homeRouter")

// app
const app=express()
// port
const port=process.env.PORT || 3000

// database connection
const database=process.env.DATABASE
mongoose.connect(database,{
     useNewUrlParser: true,
     useUnifiedTopology: true  ,
     useCreateIndex:true,
     useFindAndModify:false
})
.then(()=>{
console.log('connected to database');
})
.catch(err=>{
    console.log('unable to connect');
})


// event emitter
const eventEmitter=new Emitter()
app.set('eventEmitter',eventEmitter)

// middlewares
app.use(express.json())
app.use(express.urlencoded({
    extended:false
}))
// app.use(cors());
app.use("/pizza",authRoute)
app.use("/pizza",homeRoute)





const server=app.listen(port,()=>console.log(`listening to port ${port}`))

// socket

const io=require('socket.io')(server,{
    cors:{
        orign:"http://localhost:3000"
    },
})

io.on('connection',(socket)=>{
    // join with private room
    socket.on('join',(roomName)=>{
            socket.join(roomName)
    })

})

// listening to event from order status of customer controller
eventEmitter.on('orderUpdated',data=>{
    io.to(`order_${data.id}`).emit('orderUpdated',data)
})

// placing new order to show in admin panel
eventEmitter.on('orderPlaced',data=>{
    io.to('adminRoom').emit('orderPlaced',data)
})