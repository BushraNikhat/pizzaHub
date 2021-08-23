import { useRef,useState } from "react"
import { Button } from "@material-ui/core";
import {NavLink} from "react-router-dom"
import axios from "axios"
import {useHistory} from "react-router-dom"
import ActionCall from "../components/ActionCAll"

const Register = () => {
  const name=useRef()
  const password=useRef()
  const email=useRef()
  const [error,setError]=useState(null)
  const history=useHistory()


  // dispatching the action for fetching cart items
  ActionCall()

 

  // for submitting the registeration form
  const onSubmit=async(e)=>{
    e.preventDefault()
    const user={
      name:name.current.value,
      email:email.current.value,
      password:password.current.value
  }
    try {
    const response=await axios.post("/user/register",user)
     if(response.status===200){
          history.push("/login")
     }
    } catch (err) {
      // setting the error
      setError(err.response.data)
      setTimeout(() => {
        setError(null)
      }, 2000); 
      // if this all the fields will get removed from form
      if(err.response.data==="User already exists"){
        e.target.reset()
      } 
    }

  }

  return (
    <>

<div className="container-fluid form " id="login">
        <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 col-sm-6 col-11 form_col  mx-auto  d-flex align-items-center">
           
            
            <form className=" mx-auto shadow  p-3" onSubmit={onSubmit}>
            {error ? <small className="text-danger">{error}</small> : null}
            <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Your name"
            ref={name}
          />
        </div>
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
        <Button type="submit"  className="btn">
          Register
        </Button>
        <NavLink to="/login" >Already have an account?</NavLink>
        </div>
        
      </form>
            </div>
        </div>
    </div>
      
    </>
  );
};

export default Register;