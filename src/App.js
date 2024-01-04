import "./App.css";
import "./componants/Header/Navbar.css";
import Navbar from "./componants/Header/Navbar";
import NewNav from "./componants/newNavBar/NewNav";
import Maincom from "./componants/home/Maincom";
import Footer from "./componants/footer/Footer";
import SignIn from "./componants/signup_signin/SignIn";
import { SignUp } from "./componants/signup_signin/SignUp";
import { Routes, Route } from "react-router-dom";
import Cart from "./componants/cart/Cart";
import Buynow from "./componants/buynow/Buynow";
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from "react";


function App() {

  const [data,setData] = useState(false);
   
  useEffect(()=>{
      setTimeout(()=>{
         setData(true)
      },2000)
  },[])


  return (

    <>
    {
      data ? (
        <>
           
      <Navbar />
      <NewNav />
      <Routes>
        <Route path="/" element={<Maincom />}></Route>
        <Route path="/login" element={<SignIn />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
        <Route path="/getproductsone/:id" element={<Cart />}></Route>
        <Route path="/buynow" element={<Buynow />}></Route>
      </Routes>
      <Footer />
        </>
      ):(
        <div className="circle">
        <CircularProgress />
          <h2>Loading.....</h2>
        </div>
      )
    }
      
    </>
  );
}

export default App;
