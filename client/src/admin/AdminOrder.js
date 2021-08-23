import React from "react";
import AdminTable from "./AdminTable";
import {useEffect,useState} from "react"
import axios from "axios"
import {io} from "socket.io-client"

const AdminOrder = () => {
  const [allOrders,setAllOrders]=useState([])
  const [socket,setSocket]=useState(null)
  
// fetching all the orders 
useEffect(()=>{
  let isCancelled=false
  const fetchAllOrders=async()=>{
     try {
       const response=await axios.get("/admin/order")
       if(!isCancelled){
       setAllOrders(response.data)
      }
     } catch (error) {
     }
  }
  fetchAllOrders()
  return()=>{
    isCancelled=true
  }
},[])

// setting socket
useEffect(()=>{
    setSocket(io('ws://localhost:5000'))
},[])

// listening to socket to join new room named admin room
useEffect(()=>{
    socket?.emit('join','adminRoom')  
},[socket])

// listening to socket to get data from socket
useEffect(()=>{

socket?.on('orderPlaced',order=>{
  let newOrder=[...allOrders]
  newOrder.unshift(order)
  setAllOrders(newOrder)

}) 

},[socket,allOrders])

  return (
    <>
      <div className="container-fluid">
        <div className="row flex-grow-1">
          <div className="col-lg-10 col-12 py-5  mx-auto ">

          {allOrders.length ? 
          <>
              <h5 className=" fw-bold mb-3">All Orders</h5>
             
                  <AdminTable allOrders={allOrders}/>
              
                
                </>
                :
                <h2 className=" fw-bold mb-3 text-center">No order placed yet</h2>
          }
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrder;
