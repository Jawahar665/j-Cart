import "./App.css";
import Headers from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProductDetail from "./components/products/ProductDetail";
import ProductSearch from "./components/products/ProductSearch";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userAction";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/Forgotpassword";
import ResetPassword from "./components/user/ResetPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import axios from 'axios'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/cart/OrderSuccess";
import UserOrders from "./components/order/UserOrders";
import OrderDetail from "./components/order/OrderDetail";


function App() {
  
  const [stripeApiKey,setstripeApiKey]=useState('')
  useEffect(()=>{
  store.dispatch(loadUser)
  async function getStripeApiKey(){
    const{data}=await axios.get('/api/v1/stripeapi')
    setstripeApiKey(data.stripeApiKey)

  }
  getStripeApiKey()
  },[])
  
  return (
    <Router>
      <div>
        <HelmetProvider>
        <Headers />
        <div class="container container-fluid">
        <ToastContainer/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/search/:keyword' element={<ProductSearch/>}/>
          <Route path='/product/:id' element={<ProductDetail/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/myprofile' element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
          <Route path='/myprofile/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
          <Route path='/myprofile/update/password' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>
          <Route path='/password/forgot' element={<ForgotPassword/>}/>
          <Route path='/password/reset/:token' element={<ResetPassword/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>}/>
          <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
          <Route path='/order/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>}/>
          <Route path='/order/:id' element={<ProtectedRoute><OrderDetail/></ProtectedRoute>}/>
          <Route path='/orders' element={<ProtectedRoute><UserOrders/></ProtectedRoute>}/>
         {stripeApiKey&&
          <Route path='/payment' element={<ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements></ProtectedRoute>}/>
        }
        </Routes>
      
        </div>
       
        <Footer />
        </HelmetProvider>
      </div>
    </Router>
  );
}

export default App;
