import moment from "moment"
import axios from "axios"
import Noty from "noty"

const AdminTableBody = ({ allOrders }) => {
    
  const { _id, status, customerId, createdAt, address ,items} = allOrders;


  // setting the status state
  const handleChange=async(e)=>{
    try{
      let value=e.target.value
      await axios.post("/admin/order/status",{value,_id})
    }catch(error){
        new Noty({
          type:"error",
          text: 'something went wrong',
          timeout:700,
          progressBar:false
      
        }).show();
        window.location.reload()

    }

  }


  return (
    <> 
      <td>
        <p className="m-0">{_id}</p>
        <div>
        {items.item.map((element)=>{
                return <p key={element.pizza._id} className="m-0">{`${element.pizza.name} - ${element.qty}`}</p>
        })}
          
        </div>
      </td>
      <td>{customerId.name}</td>
      <td>{address}</td>
      <td>
        <form action="/admin/order/status" method="POST" id="form">
          <input type="hidden"/>
          <select className="form-select" aria-label="Default select example" name="select" defaultValue={status} onChange={handleChange} >
            <option value='order_placed'>Placed</option>
            <option value='Confirmed'>Confirmed</option>
            <option value="Prepared" >Prepared</option>
            <option value='Delivered'>Delivered</option>
            <option value='Completed'>Completed</option>
          </select>
        </form>
      </td>
      <td>{moment(createdAt).format("hh:mm A")}</td>
    </>
  );
};

export default AdminTableBody;
