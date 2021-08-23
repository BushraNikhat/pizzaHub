import React from 'react'
import {NavLink} from "react-router-dom"
import moment from "moment"


const OrderTable = ({myOrders}) => {

    return (
        <>
        <div className="table-responsive">
            <table className="table  table-bordered ">
              <thead >
                <tr >
                  <th scope="col">Orders</th>
                  <th scope="col" >Address</th>
                  <th scope="col" >Time</th>
                </tr>
              </thead>
              <tbody>
              {myOrders.map((order)=>{
                return <tr key={order._id}>
                  <td className="order_id">
                  <NavLink to={`/status/${order._id}` } className="text-danger">
                      {order._id}
                  </NavLink>
                  </td>
                  <td>{order.address}</td>
                  <td>{moment(order.createdAt).format("hh:mm A")}</td>
                </tr>
              })}
              </tbody>
            </table>
            </div>
        </>
    )
}

export default OrderTable
