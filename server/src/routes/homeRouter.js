const express = require('express');
const route=express.Router()
const {createPizza,findPizza,addToCart,findCartItem,inrementInCart,decrementFromCart,removePizzaFromCart}=require("../controllers/homeController")
const {placeOrder,fetchOrder,fetchStatus} = require("../controllers/orderController");
const {fetchAdminOrder,changeStatus} = require("../controllers/admin/orderController");

route.post("/menu/create",createPizza)
route.get("/menu/find",findPizza)

route.post("/cart/add",addToCart)
route.post("/cart/increment",inrementInCart)
route.delete("/cart/decrement/:id",decrementFromCart)
route.post("/cart/removePizza",removePizzaFromCart)
route.get("/cart/find/:id",findCartItem)

route.post("/order/place",placeOrder)
route.get("/order/place/:customerId",fetchOrder)
route.post("/order/status/:id",fetchStatus)

// Admin
route.get("/admin/order",fetchAdminOrder)
route.post('/admin/order/status',changeStatus)

module.exports=route