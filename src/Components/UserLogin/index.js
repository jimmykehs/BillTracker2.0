import React, { useState } from "react";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import "./UserLogin.css";
import { motion, AnimatePresence } from "framer-motion";

const UserLogin = () => {
  const [signInMethod, setSignInMethod] = useState("Sign In");
  return (
    <motion.div id="SignInContainer" exit={{ scale: 0 }}>
      <AnimatePresence>
        {signInMethod === "Sign In" && (
          <motion.div
            exit={{ rotate: 90 }}
            initial={{ rotate: 90 }}
            animate={{ rotate: 0 }}
            transition={{
              duration: 2,
              type: "spring",
            }}
          >
            <SignIn setSignInMethod={setSignInMethod} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {signInMethod === "Sign Up" && (
          <motion.div
            initial={{ position: "absolute", opacity: 0 }}
            animate={{ opacity: [0, 0, 1] }}
            transition={{ duration: 2, times: [0, 0.7, 1] }}
            exit={{ display: "none" }}
          >
            <SignUp setSignInMethod={setSignInMethod} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default UserLogin;
