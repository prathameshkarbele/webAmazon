import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import "./signup.css";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../Context/ContextProvider";



function SignIn() {
  const [logdata, setData] = useState({
    email: "",
    password: "",
  });

  console.log("logdata", logdata);
  const {account, setAccount} = useContext(LoginContext);



  const addData = (e) => {
    const { name, value } = e.target;

    setData(() => {
      return {
        ...logdata,
        [name]: value,
      };
    });
  };
  const sendData = async (e) => {
    e.preventDefault();
    const { email, password } = logdata;

    console.log("Sending data:", JSON.stringify({ email, password }));

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const data = await res.json();
    if (res.status === 400 || data.error) {
      console.log("Invalid Details");
      toast.warn("invalid details", {
        position: "top-center",
      });
    } else {
      console.log("Data Valid");
      setAccount(data)

      
      // Store the token and handle further actions
      toast.success("user valid", {
        position: "top-center",
      });
      setData({ ...logdata, email: "", password: "" });
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="blacklogoamazon.png" alt="" />
        </div>
        <div className="sign_form">
          <form action="" method="POST">
            <h1>Sign In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={addData}
                value={logdata.email}
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={addData}
                value={logdata.password}
                placeholder="Atleast 6 Character"
              />
            </div>
            <button className="signin_btn" onClick={sendData}>
              Continue
            </button>
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New to Amzon</p>
          <NavLink to="/register">
            <button>Create your Amzon Acount</button>
          </NavLink>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
}

export default SignIn;
