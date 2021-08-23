import EmptyCart from '../components/EmptyCart'
import FullCart from '../components/FullCart'
import {useSelector,useDispatch} from "react-redux"
import {useEffect} from "react"
import {manageTheCart} from "../redux/action/cart"


const Cart = () => {
    const pizzaInCart = useSelector(state => state.cartReducer)
    const dispatch = useDispatch()
    const user=JSON.parse(localStorage.getItem("document"))

// dispatching the action for fetching cart items
    useEffect(()=>{
        (dispatch(manageTheCart(user._id)))
    },[dispatch,user._id])

    return (
        <>
            {(pizzaInCart.totalQty !== 0 )?<FullCart/> : <EmptyCart/>}
        </>
    )
}

export default Cart
