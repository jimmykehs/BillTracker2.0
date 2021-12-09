const sgMail = require("@sendgrid/mail");
const { client } = require("../db");
const { getAllUsers, getBillsByDate } = require("../db/_Read");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendNotifcations() {
  try {
    client.connect();
    const todaysDate = new Date().getDate();
    const allUsers = await getAllUsers();

    await Promise.all(
      allUsers.map(async (user) => {
        const futureBillsDate = todaysDate + user.days_before_alert;
        const futureBills = await getBillsByDate(user.user_id, futureBillsDate);
        console.log(user);
        if (user.email_alerts) {
          await sendEmail(user, futureBills);
        }
      })
    );
  } catch (error) {
    console.log(error);
  } finally {
    client.end();
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

async function sendText(phone, bill) {
  try {
    console.log("Sending text...");
  } catch (error) {
    console.log(error);
  }
}

sendNotifcations();
