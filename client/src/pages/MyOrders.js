import { useEffect,useState } from "react";
import ActionCall from "../components/ActionCAll";
import axios from "axios";
import Table from "../components/OrderTable"

const MyOrders = () => {
const [myOrders,setMyOrders]=useState([])
const [error,setError]=useState(null)
  const user = JSON.parse(localStorage.getItem("document"));

  // dispatching the action for fetching cart items
  ActionCall();


//   fetching all the orders of the user
  useEffect(() => {
    let isCancelled=false //variable for clean up function
    const fetchOrders = async () => {
      try {
        
        const response = await axios.get(`/order/place/${user._id}`);
        if(!isCancelled){
        setMyOrders(response.data)
        setError(null)
      }
      } catch (error) {
        if(!isCancelled){
        setError("Somethig went wrong")}
      }
    };
    fetchOrders();
    return()=>{
      isCancelled=true
    }
  }, [user._id]);

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-grow-1">
          <div className="col-10 py-5  mx-auto ">
          <h5 className=" fw-bold mb-3">All Orders</h5>
       {
         error ?( <h2 className=" fw-bold mb-3 text-center">{error}</h2>) : myOrders.length ? 
             (
                <Table myOrders={myOrders}/>
                )
                :
               ( <h2 className=" fw-bold mb-3 text-center">No order placed yet</h2>)
       }  
          </div>
        </div>
      </div>
    </>
  );
};

export default MyOrders;
