import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
const SignIn = ({ setSignInMethod }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  async function handleSignIn(e) {
    try {
      e.preventDefault();
      const { data } = await axios.post("/api/user/login", {
        user: { username, password },
      });
      if (data.token) {
        setLoginError("");
        localStorage.setItem("BillTrackerJWT", data.token);
        window.location.href = "/dashboard";
      } else {
        setLoginError("Invalid credentials, try again.");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div id="SignInBox">
      <div id="box-stripe"></div>
      <motion.form
        transition={{ duration: 0.75 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onSubmit={async (e) => await handleSignIn(e)}
      >
        <h1>Sign In</h1>
        <p className="LoginError">{loginError}</p>
        <div className="formGroup">
          <label htmlFor="username-signin">Username</label>
          <input
            id="username-signin"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password-signin">Password</label>
          <input
            id="password-signin"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>Forgot Password?</p>
        <button className="submitFormButton">Sign In</button>
        <motion.p
          initial={{ opacity: 0, display: "none" }}
          animate={{ opacity: 1, display: "initial" }}
          transition={{ delay: 2 }}
          className="toggle-sign-in"
          onClick={() => setSignInMethod("Sign Up")}
        >
          Sign Up
        </motion.p>
      </motion.form>
    </div>
  );
};

export default SignIn;
