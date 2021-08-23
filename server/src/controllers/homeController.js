const Menu=require("../model/menu")
const Cart=require("../model/Cart")

exports.createPizza=async(req,res)=>{
    try {
        const newPizza=await new Menu(req.body)
        const savedPizza=await newPizza.save()
        res.status(201).json(savedPizza)
    } catch (error) {
        res.status(500).json(error.message)
    }
    
}

exports.findPizza=async(req,res)=>{
    try {
        const pizzas=await Menu.find()
        if(pizzas.length !=0){
            res.status(200).json({pizzas})
        }else{
            res.status(404).json("No pizza found")
        }
    } catch (error) {
        res.status(500).json(error.message)
    }
}


exports.addToCart=async(req,res)=>{
    try{
        const {_id,name,price,size,image,customerId}=req.body
        const add=await new Cart({pizzaId:_id,name,price,size,image,customerId})
        const added=await add.save()
        if (added){
            res.status(200).json("Item added to cart")
        }else{
            res.status(400).json("Something went wrong")
        }
    }catch(error){
        res.status(500).json("Server not responding")
    }
}

// increment in specific items
exports.inrementInCart=async(req,res)=>{
    try{
        const {pizzaId,name,price,size,image,customerId}=req.body
        const add=await new Cart({pizzaId,name,price,size,image,customerId})
        const added=await add.save()
        if (added){
            res.status(200).json("Item added to cart")
        }else{
            res.status(400).json("Something went wrong")
        }
        
    }catch(error){
        res.status(500).json("Server not responding")
    }
}

// decrement one by one from cart using id
exports.decrementFromCart=async(req,res)=>{
    try {
        const _id=req.params.id
        const deleted=await Cart.findByIdAndDelete({_id})
        res.status(200).json({deleted})
    } catch (error) {
        res.status(500).send(error.message);
    }
}
// remove specific pizza from cart using pizzaId
exports.removePizzaFromCart=async(req,res)=>{
    try {
        const {pizzaId,customerId}=req.body
        const deleted=await Cart.deleteMany({pizzaId,customerId})
        res.status(200).json({deleted})
    } catch (error) {
        res.status(500).send(error.message);
    }
}

exports.findCartItem=async(req,res)=>{
    try{
        const customerId=req.params.id
        const cartItems=await Cart.find({customerId:customerId})
        res.status(200).json(cartItems)
    }catch(error){
        res.status(500).json(error.message)
    }
}



