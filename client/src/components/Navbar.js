
import { ShoppingCart,ClearAll } from "@material-ui/icons";
import { Button} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const pizzaInCart = useSelector(state => state.cartReducer.totalQty)
  const user=JSON.parse(localStorage.getItem("document"))

const logout=()=>{
  localStorage.clear()
  window.location.reload();
}

  return (
    <>
      <div className="container-fluid nav p-0">
        <div className="row flex-grow-1 g-0">
          <div className=" col-10 mx-auto">
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container-fluid">
                <NavLink className="navbar-brand" to="/">
                  <img
                    src="/assests/images/header.png"
                    alt=""
                    className="me-2"
                  />
                  pizzaHub
                </NavLink>
                <Button
                  className="navbar-toggler "
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <ClearAll/>
                </Button>
             
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav ms-auto text-end">
                    <li className="nav-item">
                      <NavLink
                        exact
                        to="/"
                        className="nav-link"
                        activeStyle={{
                          fontWeight: "bold",
                        }}
                      >
                        Menu
                      </NavLink>
                    </li>
                   
                  {!user ? <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/register"
                        activeStyle={{
                          fontWeight: "bold",
                        }}
                      >
                        Register
                      </NavLink>
                    </li> 
                      
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/login"
                        activeStyle={{
                          fontWeight: "bold",
                        }}
                      >
                        Login
                      </NavLink> 
                    </li> 
               
                    </> : (user.role==="admin") ?
                    <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/order"
                        activeStyle={{
                          fontWeight: "bold",
                        }}
                        
                      >
                        Orders
                      </NavLink> 
                    </li> 
                    
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/login"
                        activeStyle={{
                          fontWeight: "bold",
                        }}
                        onClick={logout}
                      >
                        Logout
                      </NavLink> 
                    </li> </> :
                    
                        <>
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/orders"
                        activeStyle={{
                          fontWeight: "bold",
                        }}
                        
                      >
                        My Orders
                      </NavLink> 
                    </li> 
                    
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        to="/login"
                        activeStyle={{
                          fontWeight: "bold",
                        }}
                        onClick={logout}
                      >
                        Logout
                      </NavLink> 
                    </li> 
                    
                        
                        <li className="nav-item ">
                      <NavLink
                        className="nav-link px-3 py-1"
                        to="/cart"
                        activeStyle={{
                          fontWeight: "bold",
                        }}
                      >
                      <span className=" pe-1">{(pizzaInCart===0?"":pizzaInCart)}</span>
                        <ShoppingCart />
                      </NavLink>
                    </li></>}

                   
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

