// logic for placing an order of pizza
const Order = require('../model/order');
const Cart=require("../model/Cart")


exports.placeOrder=async(req,res)=>{
    try {
        const {number,address,customerId,items}=req.body
        if(!number || !address){
            res.status(400).json("All fields are mandatory")
        }else{
            const order=await new Order({number,address,customerId,items})
            const newOrder=await order.save()
            await Order.populate(newOrder,{path:"customerId"})
            // Emit new order
            const eventEmitter=req.app.get('eventEmitter')
                eventEmitter.emit('orderPlaced',newOrder)
               const del=await Promise.all( items.item.map((element)=>{
                return Cart.deleteMany({pizzaId:element.pizza.pizzaId,customerId})  
                     
        }))
            res.status(201).json(newOrder)
          
        }
       
    } catch (error) {
        res.status(500).json("Something went wrong")
    }

}
exports.fetchOrder=async(req,res)=>{
    try {
        const customerId= req.params.customerId
        const orders=await Order.find({customerId},null,{sort:{'createdAt':-1}})
        res.status(201).json(orders)
    } catch (error) {
        res.status(500).json(error.message)
    }
}
exports.fetchStatus=async(req,res)=>{
    try{
        const id=req.params.id
        const {userId}=req.body
        const order=await Order.findById(id)
        if(userId.toString()===(order.customerId).toString()){
            return res.status(200).json(order)
        }
        return   res.status(400).json("You are not allowed to view other's order status")
        

    }catch(error){
            res.status(500).json("something went wrong")
    }
}
