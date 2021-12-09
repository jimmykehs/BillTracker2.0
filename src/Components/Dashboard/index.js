import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AllBills from "./AllBills";
import "./dashboard.css";
import axios from "axios";

const Dashboard = ({ hidePaid }) => {
  const [bills, setBills] = useState([]);

  async function getUserBills() {
    try {
      const { data } = await axios.get("/api/user/me", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("BillTrackerJWT")}`,
        },
      });
      setBills(data.bills.sort((a, b) => a.bill_due_date - b.bill_due_date));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserBills();
  }, []);
  return (
    <>
      <motion.div
        id="Dashboard"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AllBills bills={bills} setBills={setBills} hidePaid={hidePaid} />
      </motion.div>
    </>
  );
};

export default Dashboard;
