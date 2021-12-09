import React from "react";

import AddBills from "../AddBill";
import Bill from "./_Bill";
import Footer from "../Footer";

const AllBills = ({ bills, setBills, hidePaid }) => {
  return (
    <>
      <div id="mainContent">
        <AddBills bills={bills} setBills={setBills} />
        <div id="allBills">
          <table>
            <thead>
              <tr>
                <th>Bill</th>
                <th>Due Date</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bills !== undefined &&
                bills.map((bill, idx) => {
                  if (hidePaid && !bill.bill_paid) {
                    return (
                      <Bill
                        key={bill.bill_id}
                        index={idx}
                        bill={bill}
                        setBills={setBills}
                        bills={bills}
                      />
                    );
                  } else if (!hidePaid) {
                    return (
                      <Bill
                        key={bill.bill_id}
                        index={idx}
                        bill={bill}
                        setBills={setBills}
                        bills={bills}
                      />
                    );
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer bills={bills} />
    </>
  );
};

export default AllBills;
