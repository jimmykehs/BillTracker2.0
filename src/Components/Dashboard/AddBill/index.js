import React, { useState } from "react";
import axios from "axios";

const AddBills = ({ bills, setBills }) => {
  const [bill_name, setBillName] = useState("");
  const [bill_link, setBillLink] = useState("");
  const [bill_due_date, setBillDueDate] = useState(1);
  const [bill_price, setBillPrice] = useState(0.0);

  function populateSelect() {
    let options = [];
    for (let i = 1; i <= 31; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  }

  async function addBill(e) {
    try {
      e.preventDefault();
      const billData = {
        bill_name,
        bill_link,
        bill_due_date,
        bill_price,
      };

      const { data } = await axios.post(
        "/api/bill/",
        { billData },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("BillTrackerJWT")}`,
          },
        }
      );
      let newAllBills = [...bills];
      console.log(data);
      newAllBills.push(data);
      setBills(newAllBills.sort((a, b) => a.bill_due_date - b.bill_due_date));

      setBillName("");
      setBillLink("");
      setBillDueDate("1");
      setBillPrice(0.0);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div id="addBills">
      <form onSubmit={(e) => addBill(e)}>
        <div className="formGroup">
          <label htmlFor="addBillName">Bill Name</label>
          <input
            htmlFor="addBillName"
            type="text"
            value={bill_name}
            onChange={(e) => setBillName(e.target.value)}
          ></input>
        </div>
        <div className="formGroup">
          <label htmlFor="addBillLink">Bill Link</label>
          <input
            htmlFor="addBillLink"
            type="text"
            value={bill_link}
            onChange={(e) => setBillLink(e.target.value)}
          ></input>
        </div>
        <div className="formGroup">
          <label htmlFor="addBillDue">Due Date</label>
          <select
            htmlFor="addBillDue"
            type="select"
            value={bill_due_date}
            onChange={(e) => setBillDueDate(e.target.value)}
          >
            {populateSelect()}
          </select>
        </div>
        <div className="formGroup">
          <label htmlFor="addBillPrice">Price</label>
          <input
            htmlFor="addBillPrice"
            type="number"
            value={bill_price}
            pattern="^[0-9]*\.[0-9]{2}$ or ^[0-9]*\.[0-9][0-9]$"
            step=".01"
            onChange={(e) => setBillPrice(e.target.value)}
          ></input>
        </div>
        <button className="submitFormButton">Add Bill</button>
      </form>
    </div>
  );
};

export default AddBills;
