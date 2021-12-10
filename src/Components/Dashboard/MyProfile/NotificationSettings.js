import React, { useState } from "react";
import axios from "axios";

const NotificationSettings = ({ user, setUser }) => {
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone_number);
  const [daysBeforeReminder, setDaysBeforeReminder] = useState(
    user.days_before_alert
  );
  const [textAlerts, setTextAlerts] = useState(user.text_alerts);
  const [emailAlerts, setEmailAlerts] = useState(user.email_alerts);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function updateUserSettings() {
    try {
      setSuccess("");
      setError("");
      const updateData = {
        email,
        phone_number: phone,
        days_before_alert: daysBeforeReminder,
        text_alerts: textAlerts,
        email_alerts: emailAlerts,
      };
      const { data } = await axios.patch(
        "/api/user/me",
        { updateData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("BillTrackerJWT")}`,
          },
        }
      );
      setSuccess("Notification settings successfully changed!");
    } catch (error) {
      setError("Error changing notification settings");
      console.log(error);
    }
  }

  return (
    <div id="NotificationSettings">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          updateUserSettings();
        }}
      >
        <h1>Notification Settings</h1>
        <div className="formGroup checkboxGroup">
          <label htmlFor="emailNotificationCheckbox">
            Recieve Email Notifications?
          </label>
          <input
            htmlFor="emailNotificationCheckbox"
            type="checkbox"
            checked={emailAlerts}
            onChange={() => setEmailAlerts(!emailAlerts)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="changeNotifcationEmail">Email</label>
          <input
            id="changeNotifcationEmail"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formGroup checkboxGroup">
          <label htmlFor="textNotificationCheckbox">
            Recieve Text Notifications?
          </label>
          <input
            id="textNotificationCheckbox"
            type="checkbox"
            checked={textAlerts}
            onChange={() => setTextAlerts(!textAlerts)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="changeNotifcationPhone">Phone Number</label>
          <input
            id="changeNotifcationPhone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="changeDaysBeforeNotification">
            How many days before your bill is due do you want to be reminded?
          </label>
          <input
            id="changeDaysBeforeNotification"
            type="number"
            value={daysBeforeReminder}
            onChange={(e) => setDaysBeforeReminder(e.target.value)}
          />
        </div>
        <button className="submitFormButton">Update Info</button>
      </form>
      {error ? <p className="error">{error}</p> : ""}
      {success ? <p className="success">{success}</p> : ""}
    </div>
  );
};

export default NotificationSettings;
