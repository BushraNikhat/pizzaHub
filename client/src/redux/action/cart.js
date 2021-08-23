
import axios from "axios"
export const manageTheCart=(id)=>{
    return  async(dispatch)=>{
        try{
            const response=await axios.get(`/cart/find/${id}`)
            console.log(response.data)
            dispatch(CartItems(response.data))

        }catch(error){
            dispatch(ErrorMsg(error.message))
        }
    }
}


const CartItems=(data)=>{
 
    return {
        type:"CartItems",
        payload:data
    }
}
const ErrorMsg=(error)=>{
 
    return {
        type:"AddError",
        payload:error
    }
}


