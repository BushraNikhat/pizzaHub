import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {manageTheCart} from "../redux/action/cart"


const ActionCAll = () => {
    const dispatch = useDispatch()
    const user=JSON.parse(localStorage.getItem("document"))

    useEffect(()=>{
        
        try {
            (dispatch(manageTheCart(user._id)))
           
        } catch (error) {}   
    },[dispatch,user])
}


export default ActionCAll
