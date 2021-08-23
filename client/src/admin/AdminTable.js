import AdminTableBody from "./AdminTableBody"


const AdminTable = ({ allOrders }) => {
  return (
    <>
    <div className="table-responsive">
      <table className="table  table-bordered  align-middle">
        <thead>
          <tr >
            <th scope="col">
              Orders
            </th>
            <th scope="col" >
              Customers
            </th>
            <th scope="col" >
              Address
            </th>
            <th scope="col" >
              Status
            </th>
            <th scope="col" >
              Place at
            </th>
          </tr>
        </thead>
        <tbody>
        {allOrders.map((order)=>{
          return <tr key={order._id}><AdminTableBody allOrders={order}/></tr>
        })}
          
       
          
        </tbody>
      </table>
      </div>
    </>
  );
};

export default AdminTable;
