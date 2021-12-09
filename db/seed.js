const { client } = require("./index");
const { createBill, createUser, updateUser, updateBill } = require("./exports");

const seedUser = {
  username: "Jimmytheladd",
  email: "jamesekehs@gmail.com",
  password: "$2b$10$ZZ4jHDFvQyzXtylo/nOF2.5fkorrRG9Sf/2ibv8HKhkv5Jfb9azz6",
  first_name: "Jimmy",
  last_name: "Kehs",
  phone_number: "2257470661",
  email_alerts: true,
  text_alerts: true,
  days_before_alert: 3,
};

const seedBill = {
  user_id: 1,
  bill_name: "Test Bill",
  bill_price: 5.555,
  bill_due_date: 25,
};

const updateUserData = {
  first_name: "James",
  last_name: "Keys",
  email_alerts: false,
};

const updateBillData = {
  bill_name: "New Bill Name",
  bill_link: "www.google.com",
  bill_price: 10.75,
};

async function buildTables() {
  try {
    console.log("DROPPING TABLES");
    await client.query(`
        DROP TABLE IF EXISTS bills;
        DROP TABLE IF EXISTS users;
      `);
    console.log("TABLES DROPPED");

    console.log("BUILDING TABLES");
    await client.query(`
        CREATE TABLE users(
            user_ID SERIAL PRIMARY KEY,
            username VARCHAR(255) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            first_name VARCHAR(255),
            last_name VARCHAR(255),
            phone_number VARCHAR(255),
            email_alerts BOOLEAN DEFAULT TRUE,
            text_alerts BOOLEAN DEFAULT FALSE,
            days_before_alert INT DEFAULT 5
        );

        CREATE TABLE bills(
            bill_ID SERIAL PRIMARY KEY,
            user_ID INT REFERENCES users ON DELETE CASCADE,
            bill_name VARCHAR(255) NOT NULL,
            bill_link VARCHAR(255),
            bill_price NUMERIC(6,2) NOT NULL,
            bill_paid BOOLEAN DEFAULT FALSE,
            bill_due_date INT
        );
        
    `);
    console.log("TABLES BUILT");
  } catch (err) {
    console.log(err);
  }
}

async function rebuildDB() {
  try {
    client.connect();
    await buildTables();

    console.log("CREATING USER");
    await createUser(seedUser);

    console.log("CREATING BILL");
    await createBill(seedBill);

    console.log("UPDATING USER");
    await updateUser(1, updateUserData);

    console.log("UPDATING BILL");
    await updateBill(1, updateBillData);
    console.log("REBUILD SUCCESSFUL");
  } catch (err) {
    console.log("ERROR REBUILDING DB");
    console.log(err);
  } finally {
    client.end();
  }
}

rebuildDB();
