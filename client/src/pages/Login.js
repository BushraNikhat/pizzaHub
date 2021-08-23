import { useRef,useState } from "react"
import { Button } from "@material-ui/core";
import {NavLink,useHistory} from "react-router-dom"
import axios from "axios"
import ActionCall from "../components/ActionCAll"



const Login = () => {
  const password=useRef()
  const email=useRef()
  const [error,setError]=useState(null)
  const history=useHistory()
 

  // dispatching the action for fetching cart items
  ActionCall()


 // for submitting the login form
const onSubmit=async(e)=>{
  e.preventDefault()
  const user={
    email:email.current.value,
    password:password.current.value
}
  try {

  const response=await axios.post("/user/login",user)
   if(response.status===200){
        localStorage.setItem('document',JSON.stringify(response.data));
        window.location.reload();
        setTimeout(() => {
          history.push("/")
        }, 1000);
       
   }
  } catch (err) {
    // setting the error
    setError(err.response.data)
    setTimeout(() => {
      setError(null)
    }, 2000);  
  }

}


  return (
    <>

<div className="container-fluid form " id="login">
        <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-10 form_col  mx-auto  d-flex align-items-center">
            <form className=" mx-auto shadow w-100  p-3" onSubmit={onSubmit}>
            {error ? <small className="text-danger">{error}</small> : null}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Email"
            ref={email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            ref={password}
          />
        </div>

        <div className="d-flex align-items-center justify-content-between">
        <Button type="submit" className="btn">
          Login
        </Button>
        <NavLink to="/register" >Register to login</NavLink>
        </div>
        
      </form>
            </div>
        </div>
    </div>
      
    </>
  );
};

export default Login;
