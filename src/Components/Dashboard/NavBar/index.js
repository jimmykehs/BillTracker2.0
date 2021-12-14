import React from "react";
import { Link } from "react-router-dom";
import bill from "../../../Images/bill.svg";
import user from "../../../Images/user.svg";
import logout from "../../../Images/logout.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NavBar = ({ hidePaid, setHidePaid }) => {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("BillTrackerJWT");
    navigate("/");
  }
  return (
    <motion.div
      id="navBar"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1>Jim's Bill Tracker</h1>
      <div className="navItems">
        <div className="navItem">
          <div className="mainItem">
            <img src={bill} alt={"Bill"} />{" "}
            <Link to="/dashboard">My Bills</Link>
          </div>
          {location.pathname === "/dashboard" && (
            <div className="subItems">
              <div className="HidePaidBillsContainer">
                <label htmlFor="HidePaidBills">Hide Paid</label>
                <input
                  type="checkbox"
                  checked={hidePaid}
                  onChange={() => setHidePaid(!hidePaid)}
                />
              </div>
            </div>
          )}
        </div>

        <div className="navItem">
          <div className="mainItem">
            <img src={user} alt={"User"} />{" "}
            <Link to="/myProfile">My Profile</Link>
          </div>
        </div>

        <div className="navItem logout">
          <div className="mainItem">
            <img src={logout} alt={"Logout"} />{" "}
            <button
              id="logout-btn"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NavBar;
