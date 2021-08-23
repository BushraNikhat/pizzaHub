import {Button} from "@material-ui/core"

const Header = () => {
  return (
    <>
      <header className="header container-fluid" >
        <div className="row">
          <div className="col-10 mx-auto py-5 px-0">
              <div className="row item_container g-0">
                  <div className="col-6 item_left item p-0 ">
                      <h6><em>Are you hungry?</em></h6>
                      <h1 className="fw-bold">Don't wait !</h1>
                      <Button variant='contained' className="btn"><a href="#order">Order now</a></Button>

                  </div>
                  <div className="col-6 item_right item p-0 d-flex justify-content-end align-items-center">
 
                      <img src="assests/images/header.png" alt="headre_picture"/>
                  </div>
              </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
