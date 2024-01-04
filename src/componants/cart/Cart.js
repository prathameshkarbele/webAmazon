import React, { useContext, useEffect, useState } from "react";
import {  Divider } from "@mui/material";
import logo from "../cart/img1.png";
import "./Cart.css";
import { useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../Context/ContextProvider";
import CircularProgress from '@mui/material/CircularProgress';


function Cart() {
  const { id } = useParams("");
  const history = useNavigate("")
  // console.log(id)
const {account, setAccount} = useContext(LoginContext);


  const [inddata, SetindData] = useState("");

  console.log(inddata, "9mddff");

  const getinddata = async () => {
    const res = await fetch(`/getproductsone/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log("data", data);

    if (res.status !== 201) {
      console.log("Np data availble");
    } else {
      console.log("getdata");
      SetindData(data);
    }
  };
  useEffect(() => {
    setTimeout(getinddata, 2000)
   
  }, [id]);

  // add cart Function
  const addtocart = async (id) => {
    const checkres = await fetch(`/addcart/${id}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inddata,
      }),
      credentials: "include",
    });


    const data1 = await checkres.json();
    console.log(data1) 

    if(checkres.status === 401 || !data1){
      console.log("User invalid")
      alert("User invalid")

    }
    else{
      // alert("Data added  in your  cart ")
      history("/buynow")
      setAccount(data1)
    }
  };

  return (
    <div className="cart_section">
      {inddata && Object.keys(inddata).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img className="img1" src={inddata.detailUrl} alt="wrongImg" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(inddata.id)}
              >
                Add to Cart
              </button>
              <button className="cart_btn1">Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{inddata.title?.shortTitle}</h3>
            <h4>{inddata.title?.longTitle}</h4>
            <Divider />
            <p className="mrp">
              M.R.P. : <del>₹{inddata.price?.mrp}</del>
            </p>
            <p>
              Deal of the Day:{" "}
              <span style={{ color: "#B12704" }}>
                {" "}
                ₹{inddata.price?.cost}.00
              </span>
            </p>
            <p>
              You Save:{" "}
              <span style={{ color: "#228b22" }}>
                {" "}
                ₹{inddata.price?.mrp - inddata.price?.cost} (
                {inddata.price?.discount}){" "}
              </span>
            </p>
            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#000000" }}> {inddata?.discount}</span>
              </h5>
              <h4>
                Free Delivery :-
                <span style={{ color: "#111", fontWeight: 600 }}>
                  {" "}
                  Oct 9-12
                </span>
                Detalis
              </h4>
              <p>
                Fastest deliver̥y :{" "}
                <span style={{ color: "#228b22", fontWeight: 600 }}>
                  Tommorow 11AM
                </span>
              </p>
            </div>
            <p className="description">
              Description:{" "}
              <span
                style={{
                  color: "#565959",
                  fontWeight: 600,
                  fontSize: 14,
                  latterspacing: 0.4,
                }}
              >
                {inddata?.description}
              </span>
            </p>
          </div>
        </div>
      )}
      {
        !inddata ?  <div className="circle">
        <CircularProgress />
          <h2>Loading.....</h2>
        </div>:""
      }
    </div>
  );
}

export default Cart;
