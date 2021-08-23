import {SentimentVeryDissatisfied} from "@material-ui/icons"
import {Button} from "@material-ui/core"
import { NavLink } from "react-router-dom";

const EmptyCart = () => {
  return (
    <>
      <div className="container-fluid  cart ">
        <div className="row flex-grow-1">
          <div className="col-10 cart_col mx-auto   d-flex align-items-center justify-content-center text-center">
              <div className="emptyCartContainer ">
                  <div className="empty">
                      <h2>Cart Empty <SentimentVeryDissatisfied className="sad"/></h2>
                      <p className="m-0">You haven't ordered a pizza yet.</p>
                      <p>To order go to home page.</p>
                  </div>
                  <div className="emptyImgContainer mx-auto d-sm-block d-none">
                        <img src="assests/images/empytCart.png" alt="" />
                       
                  </div>
                  <Button variant='contained'  className="btn mt-3"> <NavLink to="/">Go Back</NavLink> </Button>

              </div> 
          </div>
        </div>
      </div>
    </>
  );
};

export default EmptyCart;
