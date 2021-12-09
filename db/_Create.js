const { client } = require("./index");

const { createArgumentString } = require("./functions.js");

async function createUser(user) {
  try {
    const KEYS = Object.keys(user).join(",");
    const VALUES = Object.values(user);
    const ARGUMENT_STRING = createArgumentString(VALUES);

    const {
      rows: [newUser],
    } = await client.query(
      `
        INSERT INTO users(${KEYS})
        VALUES (${ARGUMENT_STRING})
        RETURNING *
    `,
      VALUES
    );
    delete newUser.password;
    console.log(`USER CREATED \n`, newUser);
    return newUser;
  } catch (err) {
    console.log(`ERROR CREATING USER, \n ${err}`);
    throw err;
  }
}

async function createBill(bill) {
  try {
    const KEYS = Object.keys(bill).join(",");
    const VALUES = Object.values(bill);
    let ARGUMENT_STRING = createArgumentString(VALUES);

    const {
      rows: [newBill],
    } = await client.query(
      `
        INSERT INTO bills(${KEYS})
        VALUES (${ARGUMENT_STRING})
        RETURNING *
    `,
      VALUES
    );
    console.log(`BILL CREATED \n`, newBill);

    return newBill;
  } catch (err) {
    console.log(`ERROR CREATING BILL, \n ${err}`);
    throw err;
  }
}

module.exports = {
  createBill,
  createUser,
};
