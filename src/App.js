import React, { useState } from "react";
import UserLogin from "./Components/UserLogin";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import { AnimatePresence } from "framer-motion";
import MyProfile from "./Components/Dashboard/MyProfile";
import NavBar from "./Components/Dashboard/NavBar";
import "./App.css";

const App = () => {
  const location = useLocation();
  const [hidePaid, setHidePaid] = useState(false);

  return (
    <>
      <AnimatePresence>
        {location.pathname !== "/" && (
          <NavBar hidePaid={hidePaid} setHidePaid={setHidePaid} />
        )}
      </AnimatePresence>
      <AnimatePresence exitBeforeEnter initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<UserLogin />} />

          <Route
            path="/dashboard"
            element={
              <Dashboard hidePaid={hidePaid} setHidePaid={setHidePaid} />
            }
          />
          <Route path="/myProfile" element={<MyProfile />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
