import React from "react";

const Footer = ({ bills }) => {
  function getRemainingTotal() {
    let total = 0;
    if (bills === undefined) {
      total = 0.0;
      return total;
    } else {
      bills.forEach((bill) => {
        if (bill.bill_paid === false) {
          total += parseFloat(bill.bill_price);
        }
      });

      return total.toFixed(2);
    }
  }

  return (
    <div id="totalFooter">
      <p>Remaining Monthly Expenses: ${getRemainingTotal()}</p>
    </div>
  );
};

export default Footer;
