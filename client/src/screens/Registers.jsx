import React, { useState } from "react";
import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

import { Link } from "react-router-dom";
import "./Register.css";

function Register() {
  const [values, setValues] = useState({ name: "", email: "", password: "" });

  const showAlert = (message) => {
    window.alert(message);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { name, email, password } = values; 

    if (name === "") {
      showAlert("Name is required");
      // toast.error('Name is required',{
      //   position : 'bottom-right'
      // })
    } else if (email === "") {
      showAlert("Email is required");
      // toast.error('Email is required',{
      //   position : 'bottom-right'
      // })
    } else if (password === "") {
      showAlert("password is required");
      // toast.error('password is required',{
      //   position : 'bottom-right'
      // })
    } else {
      console.log("outise try")
      try {
        console.log("inside try");
        const response = await axios.post(
          "http://localhost:5000/api/users/register",
          {
            name,
            email,
            password,
          },
          { withCredentials: true }
        );
     console.log("after request")
        console.log(response);
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
              // toast.error( password,{
              //   position : 'bottom-right'
              // })
            }else {
              alert('user already registered');
              // toast.error('user already registered',{
              //   position : 'bottom-right'
              // })
            }
          } else {
            showAlert("User Registered Successfully"); 
            // toast.success('User registered successfully',{
            //   position : 'bottom-right'
            // })
           
             window.location.href = "/login";
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
            <h2 className="text-center">Register</h2>
          </div>
          <div className="card-body">
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  password
                </label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="password"
                  onChange={(e) =>
                    setValues({ ...values, [e.target.name]: e.target.value })
                  }
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ marginLeft: "50px" }}>
                Register
              </button>
            </form>
            <div className="mt-3">
              Already have an account?<Link to="/login" style={{ color: "blue" }}>Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
   
  );
}

export default Register;
