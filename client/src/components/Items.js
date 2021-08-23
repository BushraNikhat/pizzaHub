import {Button} from "@material-ui/core"
import {Add} from "@material-ui/icons"
import axios from "axios";
import {useDispatch} from "react-redux"
import {manageTheCart} from "../redux/action/cart"
import {useHistory} from "react-router-dom"
import Noty from "noty"


const Items = ({pizza}) => {
    const dispatch = useDispatch()
    const history=useHistory()
    const user=JSON.parse(localStorage.getItem("document"))

const  addToCart=async()=>{
   
        if(!user){
            new Noty({
                type:"error",
                text: "Please login to add item",
                timeout:1000,
                progressBar:false
            
              }).show();
              history.push("/login")
        }else{
            try {
             await  axios.post("/cart/add",{...pizza,customerId:user._id});
                new Noty({
                    type:"success",
                    text: "Item added to cart",
                    timeout:1000,
                    progressBar:false
                
                  }).show();
                  dispatch(manageTheCart(user._id)) 
                }  catch (error) {
                    new Noty({
                        type:"error",
                        text: "Something went wrong",
                        timeout:1000,
                        progressBar:false
                    
                      }).show();
                }
        }
       
       
      
        
        

        

     
}


    return (
        <>
             <div className="col-12 col-sm-6 col-md-4 col-lg-3 pizza ">
                        <div className="paper text-center mb-4 p-xl-3 p-md-0 p-3">
                            <img src={`assests/images/${pizza.image}`} alt="pizza" />
                            <div>
                                <h5>{pizza.name}</h5>
                                <p>{pizza.size}</p>
                                <div className="d-flex align-items-center justify-content-between px-3">
                                    <p className="m-0 price">₹ {pizza.price}</p>
                                    <Button variant="outlined" startIcon={<Add/>} className="paper_btn" 
                                     onClick={addToCart}>
                                      Add 
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

            
       
        </>
    )
}

export default Items
