import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./MyProfile.css";
import axios from "axios";
import NotificationSettings from "./NotificationSettings";
import ResetPassword from "./ResetPassword";

const MyProfile = () => {
  const [user, setUser] = useState({});

  async function getUser() {
    try {
      const { data } = await axios.get("/api/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("BillTrackerJWT")}`,
        },
      });
      setUser(data.user);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <motion.div
      id="MyProfileContainer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <NotificationSettings key={user.user_id} user={user} setUser={setUser} />
      <ResetPassword />
    </motion.div>
  );
};

export default MyProfile;
