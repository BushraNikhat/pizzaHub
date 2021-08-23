const mongoose = require('mongoose');
const Schema=mongoose.Schema

const userSchema=new Schema({
    name:{type:String},
    email:{type:String,unique:true},
    password:{type:String},
    role:{type:String,default:"customer"},
},
{timestamps:true})




module.exports=mongoose.model("user",userSchema)