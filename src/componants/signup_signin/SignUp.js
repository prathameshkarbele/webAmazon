import React, { useState } from "react";
import "./signup.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { NavLink } from "react-router-dom";
export const SignUp = () => {
  const [udata, setUData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });


  const senddata = async (e) => {
    e.preventDefault();

    const { name, email, mobile, password, cpassword } = udata;
    try {
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, mobile, password, cpassword
            })
        });

        const data = await res.json();
        // console.log(data);

        if (res.status === 422 || !data) {
            toast.error("Invalid Details 👎!", {
                position: "top-center"
            });
        } else {
            setUData({
                ...udata, fname: "", email: "",
                mobile: "", password: "", cpassword: ""
            });
            toast.success("Registration Successfully done 😃!", {
                position: "top-center"
            });
        }
    } catch (error) {
        console.log("front end ka catch error hai" + error.message);
    }
}


  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="blacklogoamazon.png" alt="" />
        </div>
        <div className="sign_form">
          <form action="" method="post">
            <h1>Create Your Acount</h1>

            <div className="form_data">
              <label htmlFor="name">Your Name</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => setUData({ ...udata, name: e.target.value })}
                value={udata.name}
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={(e) => setUData({ ...udata, email: e.target.value })}
                value={udata.email}
              />
            </div>
            <div className="form_data">
              <label htmlFor="number">Mobile</label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                onChange={(e) => setUData({ ...udata, mobile: e.target.value })}
                value={udata.mobile}
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) =>
                  setUData({ ...udata, password: e.target.value })
                }
                value={udata.password}
                placeholder="Atleast 6 Character"
              />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Password Again </label>
              <input
                type="password"
                name="cpassword"
                id="password"
                onChange={(e) =>
                  setUData({ ...udata, cpassword: e.target.value })
                }
                value={udata.cpassword}
              />
            </div>
            <button className="signin_btn" onClick={senddata}>
              Continue
            </button>
            <div className="signin_info">
              <p>Already have an Acount?</p>
              <NavLink to="/login">Sign in</NavLink>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};
