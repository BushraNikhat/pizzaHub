import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import  {io}  from "socket.io-client";

const OrderStatus = () => {
  const[socket,setSocket]=useState(null)
  const [order, setOrder] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("document"));

  useEffect(() => {
    
    let isCancelled = false; // variable for for clean up
    const fetchStatus = async () => {
      try {
        const data = { userId: user._id };
        if(!isCancelled){
        const response = await axios.post(`/order/status/${id}`, data);
        setOrder(response.data);
        setError(null);}
      } catch (error) {
        if(!isCancelled){
        setError("Something went wrong");}
      }
    };
    fetchStatus();
    return()=>{
      isCancelled=true
    }
  }, [id, user]);


  // logic according to current status
  useEffect(() => {
    const list = document.getElementsByClassName("order_status");

    // removing the classes before putting logic
    [...list].forEach((listItem)=>{
          listItem.classList.remove('step_completed')
          listItem.classList.remove('current')
    });


    [...list].forEach((listItem) => {
      let dataProp = listItem.dataset.status;
     
      if (dataProp === order.status) {
        // making the current item and all its previous items step completed
        let currentItem=listItem
        while(currentItem){
          currentItem.classList.add('step_completed')
          currentItem=currentItem.previousElementSibling;
        }
        listItem.classList.add('step_completed')
        if(listItem.nextElementSibling){
          listItem.nextElementSibling.classList.add('current')
        }  
      }
    });
  });

  // socket 
  useEffect(()=>{
    setSocket(io("ws://localhost:5000"))
  },[])
  
  useEffect(()=>{
    if(order._id){
      socket?.emit('join',`order_${order._id}`)
    }  
  },[socket,order])


  // listening to updated order status
  useEffect(()=>{
    socket?.on('orderUpdated',(data)=>{
      const updatedOrder={ ...order}
      updatedOrder.updatedAt=moment().format()
      updatedOrder.status=data.status
      setOrder(updatedOrder)

    })
  },[socket,order])

  return (
    <>
      <div className="container-fluid ">
        <div className="row flex-grow-1 order_status_container">
          <div className="col-10   mx-auto  d-flex align-items-center">
            <div className="row order_status_box flex-grow-1">
              <div className="col-lg-8 col-md-10 col-12 mx-auto  ">
                <div className="status_heading  d-flex flex-sm-row flex-column  justify-content-between py-4 px-0 text-center">
                  <h4 className="fw-bold">Track delivery status</h4>
                  <h6 className="text-success bg-light px-2 py-1 rounded d-inline">
                    {id}
                  </h6>
                </div>
                {error ? ( <h1>{error}</h1> ) 
                :(
                <ul className="list-unstyled">
                  <li
                    className="order_status pb-5  "
                    data-status="order_placed"
                  >
                    <span>Order placed</span>
                    <small>{order.status=== 'order_placed' ? moment(order.updatedAt).format('hh:mm A') : null}</small>
                   
                  </li>
                  <li className="order_status pb-5 " data-status="Confirmed">
                    <span>Order confirmed</span>
                    <small>{order.status=== 'Confirmed' ? moment(order.updatedAt).format('hh:mm A') : null}</small>
                  </li>
                  <li className="order_status pb-5 " data-status="Prepared">
                    <span>Preparation</span>
                    <small>{order.status=== 'Prepared' ? moment(order.updatedAt).format('hh:mm A') : null}</small>
                  </li>
                  <li
                    className="order_status pb-5"
                    data-status="Delivered"
                  >
                    <span>Out for delivery</span>
                    <small>{order.status=== 'Delivered' ? moment(order.updatedAt).format('hh:mm A') : null}</small>
                  </li>
                  <li className="order_status pb-5" data-status="Completed">
                    <span>Complete</span>
                    <small>{order.status=== 'Completed' ? moment(order.updatedAt).format('hh:mm A') : null}</small>
                  </li>
                </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderStatus;
