const Order = require('../../model/order');
const User = require("../../model/user");

exports.fetchAdminOrder=async(req,res)=>{
    try {
        const orders=await  Order.find({status:{$ne:"Completed"}},null,{sort:{'createdAt':-1}}).populate('customerId','-password')
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json(error.message)
    }

}

exports.changeStatus=async(req,res)=>{
    let {value,_id}=req.body
        try {
            const updated=await Order.findByIdAndUpdate({_id},{status:value},{new:true})
           
 
                // emit event
                const eventEmitter=req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated',{id:updated._id,status:updated.status})
                return res.status(200).json(updated.status)
   
                
          
            
        } catch (error) {
            res.status(500).json(error.message)
        }
}
