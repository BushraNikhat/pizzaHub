import {useState,useEffect} from "react"
import axios from "axios"
import Items from "./Items"


const PizzaiItem = () => {
    const [pizzas,setPizzas]=useState([])
    const [error,setError]=useState(null)


// fetching all the pizzas from  backend
useEffect(()=>{
    let isCancelled = false; // variable for for clean up
        const fetchPizza=async()=>{
            try {
                
            const response=await axios.get("/menu/find")
            if(!isCancelled){
            setPizzas(response.data.pizzas)
            setError(null)}
    }
  catch (error) {
      if(!isCancelled){
    setError("Something went wrong")}
    }
}
    fetchPizza()
    return()=>{
        isCancelled=true
      }
},[setPizzas]) 
    
    return (
        <>
            <section className="container-fluid pizzaItem py-5" id="order">
            <div className="row">
            <div className="col-10 mx-auto">
                <div className="row">
                <h4 className="pb-4">All pizzas</h4>
                {error ? ( <h1>{error}</h1> ) :
                <>
                    {
                     pizzas.map((pizza)=>{
                        return <Items key={pizza._id} pizza={pizza}/>
                     })
                 }
                </>
                 
                }
                    
                   
                </div>
            </div>
        </div>
            </section>
        </>
    )
}

export default PizzaiItem
