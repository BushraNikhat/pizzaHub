import {useRef,useState} from "react"
import { ShoppingCart } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import Orders from "./Orders";
import {useHistory } from "react-router-dom";
import {useSelector} from "react-redux"
import axios from "axios"
import Noty from "noty"


const FullCart = () => {
  const pizzaInCart = useSelector(state => state.cartReducer)
  const address=useRef()
  const number=useRef()
  const history=useHistory()
  const [error,setError]=useState(null)
  const user=JSON.parse(localStorage.getItem("document"))


// submitting the form for placing an order
const onSubmit=async(e)=>{
  e.preventDefault()
  try{
    const order={
      customerId:user._id,
      address:address.current.value,
      number:number.current.value,
      items:pizzaInCart
    }
    await axios.post("/order/place",order)
    new Noty({
    type:"success",
    text: "Order places successfully",
    timeout:1000,
    progressBar:false

  }).show();
    history.push("/orders")
  }catch(error){
      setError("Someting went wrong")
      setTimeout(() => {
        setError(null)
      }, 1000);  
    
  }

  
}

  return (
    <>
      <div className="container-fluid  full_cart">
        <div className="row flex-grow-1">
          <div className="col-10 py-5  mx-auto ">
            <div className="order_container mx-auto">
              <h5 className=" fw-bold">
                <ShoppingCart /> Order summary
              </h5>
            {/* mapping all the pizza present in cart */}
            {
              pizzaInCart.totalQty !==0 &&
              pizzaInCart.item.map((items)=>{
                return <Orders key={items.pizza.pizzaId} pizzas={items}/>
              }) 
              
            }
              

              <div className="order_bottom text-end">
                <h6 className="fw-bold mb-4">
                  Total Amount: <span>{pizzaInCart.totalPrice}</span>
                </h6>
                  <form onSubmit={onSubmit}>
                  {error ? <small className="text-danger">{error}</small> : null}
                  <input
                    type="text"
                    placeholder="Address"
                    className="mb-2 ms-auto form-control"
                    ref={address}
                  />
                  <input
                    type="text"
                    placeholder="Mobile No."
                    className="mb-2 ms-auto form-control"
                    ref={number}
                  />
                  
                  <Button type="submit"  variant="contained" className="btn">
                    Order Now
                  </Button> 
                  </form> 
                 
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FullCart;
