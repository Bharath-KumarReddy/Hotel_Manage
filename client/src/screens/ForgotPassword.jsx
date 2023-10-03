import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [code, setCode] = useState("");
  const [password, setpassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  const generateError = (error) => {
    window.alert(error);
  };

  const generateSuccess = (message) => {
    window.alert(message);
  };

  const sendOtp = async (event) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/sendemail",
        {
          email,
        }
      );
      const data1 = response;
      const data = response.data.data;
      if (data1) {
        generateSuccess("OTP sent successfully!");
        setOtpSent(true);
        setEmail("");
      } else {
        generateError("Failed to send OTP.");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  const resetpassword = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/changepassword",
        {
          email,
          code,
          password,
        }
      );
      const data1 = response;
      const data = response.data.data;
      if (data1) {
        generateSuccess("Password reset successfully!");
        setResetSuccess(true);
      } else {
        generateError("Failed to reset password. Please check your OTP.");
      }
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card" style={{ maxWidth: "400px", margin: "0 auto" }}>
        <div className="card mt-5">
          <div className="card-header">
            <h2 className="text-center">Forgot password</h2>
          </div>
          <div className="card-body">
            {!otpSent && !resetSuccess && (
              <div>
                <p>Enter your email to receive (OTP) for password reset.</p>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={() => sendOtp()}>
                  Send OTP
                </button>
              </div>
            )}

            {otpSent && !resetSuccess && (
              <div>
                <p>An OTP has been sent to your email. Enter the OTP and your new password below.</p>
                <div className="mb-3">
                  <label htmlFor="otp" className="form-label">
                    OTP
                  </label>
                  <input
                    type="text"
                    name="otp"
                    className="form-control"
                    placeholder="Enter OTP"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
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
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="newpassword" className="form-label">
                    New password
                  </label>
                  <input
                    type="password"
                    name="newpassword"
                    className="form-control"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                </div>
                <button className="btn btn-primary" onClick={resetpassword}>
                  Reset password
                </button>
              </div>
            )}

            {resetSuccess && (
              <div>
                <p>Your password has been successfully reset.</p>
                <Link to="/login" className="btn btn-success">
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;
