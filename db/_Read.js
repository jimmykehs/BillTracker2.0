const { client } = require("./index");

async function getAllUsers() {
  try {
    const query = "SELECT * FROM users;";
    const { rows } = await client.query(query);
    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function getUserByID(user_id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
            SELECT * FROM users
            WHERE user_id = ($1);
        `,
      [user_id]
    );
    delete user.password;
    return user;
  } catch (err) {
    console.error(err);
  }
}

async function getUserByUsername(username) {
  try {
    const query = `SELECT * FROM users WHERE username = $1`;
    const {
      rows: [user],
    } = await client.query(query, [username]);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getBillsByDate(user_id, bill_date) {
  try {
    const query =
      "SELECT * FROM bills WHERE user_id = $1 AND bill_due_date = $2;";
    const { rows } = await client.query(query, [user_id, bill_date]);
    return rows;
  } catch (error) {
    console.log(error);
  }
}
async function getBillByBillID(bill_id) {
  try {
    const {
      rows: [bill],
    } = await client.query(
      `
                SELECT * FROM bills
                WHERE bill_id = ($1);
            `,
      [bill_id]
    );
    return bill;
  } catch (err) {
    console.error(err);
  }
}

async function getBillsByUserID(user_id) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM bills
       WHERE user_id = ($1)`,
      [user_id]
    );

    rows.forEach((bill) => {
      delete bill.user_id;
    });
    return rows;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getAllUsers,
  getBillByBillID,
  getBillsByDate,
  getBillsByUserID,
  getUserByID,
  getUserByUsername,
};
