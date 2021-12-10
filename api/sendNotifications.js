require("dotenv").config();
const sgMail = require("@sendgrid/mail");
const { client: pgClient } = require("../db");
const { getAllUsers, getBillsByDate } = require("../db/_Read");
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendNotifcations() {
  try {
    pgClient.connect();
    const todaysDate = new Date().getDate();
    const allUsers = await getAllUsers();

    await Promise.all(
      allUsers.map(async (user) => {
        const futureBillsDate = todaysDate + user.days_before_alert;
        const futureBills = await getBillsByDate(user.user_id, futureBillsDate);
        console.log(futureBills);
        if (futureBills.length > 0) {
          if (user.email_alerts) {
            await sendEmail(user, futureBills);
          }
          if (user.phone_number !== "" && user.text_alerts) {
            await sendText(user, futureBills);
          }
        }
      })
    );
  } catch (error) {
    console.log(error);
  } finally {
    pgClient.end();
  }
}

async function sendEmail(user, bills) {
  try {
    const htmlMsg = `
    <h1>You have some bills coming up!</h1>
    <p>Here they are:</p>
    <ul>
    ${bills.map((bill) => {
      return `<li>${bill.bill_name} - ${new Date().getMonth()}/${
        bill.bill_due_date
      }</li>`;
    })}
    </ul>
    `;
    const msg = {
      to: user.email,
      from: {
        email: "jimsbillpayapp@gmail.com",
        name: "Bill Tracker",
      },
      subject: "Bills due soon",
      content: [
        {
          type: "text/html",
          value: htmlMsg,
        },
      ],
    };
    await sgMail.send(msg);
    console.log(`Email sent to ${user.email}`);
  } catch (error) {
    console.log(error);
  }
}

async function sendText(user, bills) {
  try {
    let billsString = "";
    const month = new Date().getMonth();

    bills.forEach((bill) => {
      billsString += `${bill.bill_name} - ${month}/${bill.bill_due_date} - $${bill.bill_price}\n`;
    });
    console.log(billsString);
    const msg = {
      body: `You have bills coming up in ${user.days_before_alert} day(s)\n${billsString} `,
      from: "+12019497037",
      to: user.phone_number,
    };
    client.messages.create(msg).then((message) => console.log(message.sid));
    console.log("Sending text...");
  } catch (error) {
    console.log(error);
  }
}

sendNotifcations();
