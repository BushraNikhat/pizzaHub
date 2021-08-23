const mongoose = require('mongoose');

const cartSchema=mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    pizzaId:{type:String,required:true},
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    size:{type:String,required:true},
})

module.exports=mongoose.model("cart",cartSchema)