
import Navbar from './components/Navbar'
import Menu  from "./pages/Menu"
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import {Route,Switch,Redirect} from "react-router-dom"
import AdminOrder from './admin/AdminOrder'
import OrderStatus from "./components/OrderStatus"


const App = () => {
  const user=JSON.parse(localStorage.getItem("document"))

  return ( 
    <>
    <Navbar/>
   
    <Switch>
   {/* <Route path="/order" component={AdminOrder}/> */}

      <Route exact path="/" component={Menu}/>
      <Route path="/register">
        {user ? <Redirect to="/"/> : <Register/>}
      </Route>
      <Route path="/login">
        {user ? <Redirect to="/"/> : <Login/>}
      </Route>
      <Route path="/orders">
        {!user ? <Redirect to="/"/> : <MyOrders/>}
      </Route>
  
        <Route path="/order">
        {(!user || user.role !=="admin" )? <Redirect to="/"/> : <AdminOrder/>}
      </Route>
      
      <Route path="/cart" >
      {(!user || user.role !=="customer" )? <Redirect to="/"/> : <Cart/>}
      </Route>
      <Route path="/status/:id">
        {(!user || user.role !=="customer" )? <Redirect to="/"/> : <OrderStatus/>}
      </Route>
      <Redirect to="/" />


    </Switch>

    </>
  )
}

export default App
