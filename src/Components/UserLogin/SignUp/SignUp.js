import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
const SignUp = ({ setSignInMethod }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  async function signUp() {
    try {
      const user = {
        username,
        password,
        email,
        phone_number: phone,
      };
      const { data } = await axios.post("/api/user/register", { user });
      if (data.token) {
        localStorage.setItem("BillTrackerJWT", data.token);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div id="SignUpBox">
      <div id="box-stripe"></div>
      <motion.form
        onSubmit={async (e) => {
          e.preventDefault();
          await signUp();
        }}
        id="SignUpForm"
      >
        <h1>Sign Up</h1>
        <div className="formGroup">
          <label htmlFor="username-signup">Username*</label>
          <input
            id="username-signup"
            type="text"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password-signup">Password*</label>
          <input
            id="password-signup"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="confirm-password-signup"> Confirm Password*</label>
          <input id="confirm-password-signup" type="password" required />
        </div>
        <div className="formGroup">
          <label htmlFor="email-signup">Email*</label>
          <input
            id="email-signup"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="phone-signup">Phone Number</label>
          <input
            id="phone-signup"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <button className="submitFormButton">Sign Up</button>
        <motion.p
          initial={{ opacity: 0, display: "none" }}
          animate={{ opacity: 1, display: "initial" }}
          transition={{ delay: 2.5 }}
          className="toggle-sign-in"
          onClick={() => setSignInMethod("Sign In")}
        >
          Already have an account? - Sign In
        </motion.p>
      </motion.form>
    </div>
  );
};
export default SignUp;
