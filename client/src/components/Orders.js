import React from "react";
import {Button} from "@material-ui/core"
import {Add,Remove,Clear} from "@material-ui/icons"
import axios from "axios";
import {useDispatch} from "react-redux"
import {manageTheCart} from "../redux/action/cart"

const Orders = ({pizzas}) => {
  const dispatch = useDispatch()
  const {pizza,qty}=pizzas
  const user=JSON.parse(localStorage.getItem("document"))

  // decrement by id
  const decrementItem=async()=>{
    const id=pizza._id
    await axios.delete(`/cart/decrement/${id}`)
    dispatch(manageTheCart(user._id)) 
  }
  // increasing one item in each click
  const incrementItem=async()=>{
    await axios.post("/cart/increment",pizza)
    dispatch(manageTheCart(user._id)) 
  }

// removing a specfic type of pizza from cart
const removeItem=async()=>{
  const detail={
    pizzaId:pizza.pizzaId,
    customerId:pizza.customerId
  }

  await axios.post(`/cart/removePizza`,detail)
  dispatch(manageTheCart(user._id)) 
}

  return (
    <>
      <div className="order d-flex flex-sm-row flex-column align-items-center justify-content-between mb-4 border-top border-bottom py-3">
        <div className="order_type d-flex flex-sm-row flex-column align-items-center mb-sm-0 mb-3">
          <img src="assests/images/header.png" alt="" className="img-fluid mb-sm-0 mb-1"/>
          <div className="ms-3 text-sm-left text-center">
            <h6 className="m-0 fw-bold">{pizza.name}</h6>
            <p className="m-0 text-uppercase">{pizza.size}</p>
          </div>
        </div>
        <div className="order_qty_mng d-flex align-items-center border mb-sm-0 mb-3">
        <Button className="button  px-0" onClick={decrementItem}><Remove /></Button>
        <h6 className=" fw-bold m-0">{qty}</h6>
        <Button className="button px-0 text" onClick={incrementItem}><Add/></Button>
        </div>
        <h6 className=" fw-bold m-0">{`₹ ${pizza.price*qty}`}</h6>
        <Button className="remove" onClick={removeItem}><Clear/></Button>
      </div>
    </>
  );
};

export default Orders;
