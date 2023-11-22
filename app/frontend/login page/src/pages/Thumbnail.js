import React, { useState } from "react";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import "./Thumbnail.css";

const Thumbnail = () => {
  // State variables for email, password, and login status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle changes in the email field
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle changes in the password field
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Function to handle the login action
  const handleLogin = async () => {
    try {
      // Validate that both email and password are provided
      if (!email || !password) {
        console.log("Please provide both email and password");
        return;
      }
  
      // Send a POST request to your backend authentication endpoint
      const response = await fetch("http://localhost:5175/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
  
      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        // Do something with the response data, such as storing a token or updating state
        console.log("Login successful:", responseData);
        setIsLoggedIn(true);
      } else {
        // Handle unsuccessful login (display error message, etc.)
        console.log("Invalid email or password");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  return (
    <form className="thumbnail">
      <img className="thumbnail-child" alt="" src="/rectangle-9637@2x.png" />
      <div className="thumbnail-item" />
      <div className="not-registered-yet-parent">
        <div className="not-registered-yet">Not Registered Yet?</div>
        <a className="create-an-account">Create an account</a>
      </div>
      <img className="thumbnail-inner" alt="" src="/group-1686550876.svg" />
      <div className="frame-parent">
        <div className="frame-group">
          <div className="login-to-your-account-wrapper">
            <b className="login-to-your">Login to your Account</b>
          </div>
          <Button sx={{ width: 420 }} className="primary-button" variant="contained">
            Continue with Google
          </Button>
        </div>
        <Button className="or-sign-in" color="primary" variant="contained">
          ------------- or Sign in with Email ------------- 
        </Button>
        <div className="frame-group">
          <div className="frame-div">
            <div className="email-parent">
              <div className="email">Email</div>
              <input
                className="frame-child"
                type="text"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="frame-parent1">
              <div className="email-parent">
                <div className="email">Password</div>
                <input
                  className="frame-child"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="checkbox-parent">
                <div className="checkbox">
                  <FormControlLabel
                    className="or-sign-in"
                    label=""
                    control={<Checkbox color="primary" />}
                  />
                  <div className="remember-me">Remember Me</div>
                </div>
                <a className="forgot-password">Forgot Password?</a>
              </div>
            </div>
          </div>
          <Button
            sx={{ width: 420 }}
            className="primary-button1"
            color="primary"
            variant="contained"
            onClick={handleLogin}
          >
            {isLoggedIn ? "Logged In" : "Login"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Thumbnail;
