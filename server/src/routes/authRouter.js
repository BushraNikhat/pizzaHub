const express = require('express');
const route=express.Router()
const {registerRoute,loginRoute}=require("../controllers/authController")

route.post("/user/register",registerRoute)
route.post("/user/login",loginRoute)

module.exports=route