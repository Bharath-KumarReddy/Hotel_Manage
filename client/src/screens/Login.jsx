import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Forgotpassword from "./ForgotPassword";
import "./Register.css"; 

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const showAlert = (message) => {
    window.alert(message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = {
      email,
      password,
    };

    if (email === "") {
      showAlert("Email is required");
      // toast.error('Email is Required',{
      //   position : 'bottom-right'
      // })
    } else if (password === "") {
      showAlert("Password is required");
      // toast.error('Password is Required',{
      //   position : 'bottom-right'
      // })
    } else {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          user,
          { withCredentials: true }
        );

        const data = response.data;
        if (data) {
          if (data.errors) {
            const { email, password } = data.errors;
            if (email) {
              showAlert(email);
              // toast.error( email,{
              //   position : 'bottom-right'
              // })
            } else if (password) {
              showAlert(password);
              // toast.error(password,{
              //   position : 'bottom-right'
              // })
            }
          } else {
            showAlert(" Login Successful");
            // toast.success('Login Successful',{
            //   position : 'bottom-right'
            // })

        
          localStorage.setItem('currentUser', JSON.stringify(data));
          if(data.isAdmin){
            
          window.location.href = "/admin";
          }else {

            
          window.location.href = "/landing";
          }

          
          }
        }
      } catch (ex) {
        console.log(ex);
      }
    }
  };

  return (
    <>
    {/* <ToastContainer/> */}
    <div className="register-container">
      <div className="register-card">
        <div className="card mt-5">
          <div className="card-header">
            <h2 className="text-center">Login</h2>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-success mt-3 mb-3 rounded-pill">
                LOGIN
              </button>
              <br /><br></br>
              {/* <Link to='/forgotpassword' style={{color:"red", marginLeft:"0px"}}>Forgot Password?</Link><br></br><br></br> */}
              <Link to="/register" className="mt-2" >
                Dont have an account?<span style={{color:"blue"}} >Register</span>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
    
  );
}

export default Login;
