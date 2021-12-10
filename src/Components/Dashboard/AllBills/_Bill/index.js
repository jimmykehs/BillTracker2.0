import React, { useState } from "react";
import EditPencil from "../../../../Images/pencil.svg";
import Trash from "../../../../Images/trash.svg";
import Check from "../../../../Images/check.svg";
import axios from "axios";

const Bill = ({ bill, index, setBills, bills }) => {
  const [bill_name, setBillName] = useState(bill.bill_name);
  const [bill_link, setBillLink] = useState(bill.bill_link);
  const [bill_due_date, setBillDueDate] = useState(bill.bill_due_date);
  const [bill_price, setBillPrice] = useState(bill.bill_price);
  const [bill_paid, setBillPaid] = useState(bill.bill_paid);
  const [editMode, setEditMode] = useState(false);

  const token = localStorage.getItem("BillTrackerJWT");

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

  async function submitUpdate() {
    try {
      const updateData = {
        bill_name,
        bill_link,
        bill_due_date,
        bill_price,
        bill_paid,
      };

      const { data } = await axios.patch(
        `/api/bill/${bill.bill_id}`,
        { updateData },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const newBills = [...bills];
      newBills.splice(index, 1, data);
      setBills(newBills.sort((a, b) => a.bill_due_date - b.bill_due_date));
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBill() {
    try {
      const { data } = await axios.delete(`/api/bill/${bill.bill_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBills(bills.filter((bill) => bill.bill_id !== data.bill_id));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {editMode ? (
        <tr>
          <td className="nameColumn">
            <input
              type="text"
              placeholder={bill_name}
              onChange={(e) => {
                setBillName(e.target.value);
              }}
            />
            <input
              type="text"
              placeholder={bill_link === "" ? "Bill Link" : bill_link}
              onChange={(e) => {
                setBillLink(e.target.value);
              }}
            />
          </td>
          <td className="dateColumn">
            <select
              defaultValue={bill_due_date}
              onChange={(e) => {
                setBillDueDate(e.target.value);
              }}
            >
              {populateSelect()}
            </select>
          </td>
          <td className="priceColumn">
            $
            <input
              type="number"
              placeholder={bill_price}
              onChange={(e) => {
                setBillPrice(e.target.value);
              }}
            />
          </td>
          <td className="statusColumn">
            {bill_paid ? (
              <button
                className="billPaidButton"
                onClick={() => {
                  setBillPaid(!bill_paid);
                }}
              >
                PAID
              </button>
            ) : (
              <button
                className="billUnpaidButton"
                onClick={() => {
                  setBillPaid(!bill_paid);
                }}
              >
                UNPAID
              </button>
            )}
          </td>
          <td className="optionsColumn">
            <img
              src={Check}
              alt="Edit Bill"
              onClick={async () => {
                await submitUpdate();
                setEditMode(false);
              }}
            />
            <img
              src={Trash}
              alt="Delete Bill"
              onClick={async () => {
                await deleteBill();
              }}
            />
          </td>
        </tr>
      ) : (
        <tr>
          <td className="nameColumn">{bill_name}</td>
          <td className="dateColumn">{bill_due_date}</td>
          <td className="priceColumn">${bill_price}</td>
          <td className="statusColumn">
            {bill_paid ? (
              <button className="billPaidButton">PAID</button>
            ) : (
              <button className="billUnpaidButton">UNPAID</button>
            )}
          </td>
          <td className="optionsColumn">
            <img
              src={EditPencil}
              alt="Edit Bill"
              onClick={() => setEditMode(true)}
            />
            <img
              src={Trash}
              alt="Delete Bill"
              onClick={async () => {
                await deleteBill();
              }}
            />
          </td>
        </tr>
      )}
    </>
  );
};

export default Bill;
