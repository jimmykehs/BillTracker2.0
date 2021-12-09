import React, { useState } from "react";
import axios from "axios";

const ResetPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  async function resetPassword() {
    try {
      const updateData = {
        password: newPassword,
      };
      const { data } = await axios.patch(
        "api/user/me/password",
        { updateData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("BillTrackerJWT")}`,
          },
        }
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div id="ResetPassword">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await resetPassword();
        }}
      >
        <h1>Reset Password</h1>
        <div className="formGroup">
          <label htmlFor="resetPasswordCurrentPassword">Current Password</label>
          <input
            htmlFor="resetPasswordCurrentPassword"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="resetPasswordNewPassword">New Password</label>
          <input
            htmlFor="resetPasswordNewPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="formGroup">
          <label htmlFor="resetPasswordConfirmPassword">Confirm Password</label>
          <input
            htmlFor="resetPasswordConfirmPassword"
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button className="submitFormButton">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
