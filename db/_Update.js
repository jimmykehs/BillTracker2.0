const { client } = require("./index");
const { createUpdateString } = require("./functions.js");

async function updateUser(user_id, updateData) {
  try {
    const VALUES = Object.values(updateData);
    const UPDATE_STRING = createUpdateString(updateData);
    VALUES.push(user_id);
    const query = `UPDATE users SET ${UPDATE_STRING} WHERE user_id = $${VALUES.length} RETURNING *;`;
    const {
      rows: [updatedUser],
    } = await client.query(query, VALUES);
    delete updatedUser.password;
    console.log(`USER UPDATED \n`, updatedUser);
    return updatedUser;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

async function updateBill(bill_id, updateData) {
  try {
    const VALUES = Object.values(updateData);
    const UPDATE_STRING = createUpdateString(updateData);
    VALUES.push(bill_id);

    const query = `UPDATE bills SET ${UPDATE_STRING} WHERE bill_id = $${VALUES.length} RETURNING *;`;
    const {
      rows: [updatedBill],
    } = await client.query(query, VALUES);
    console.log(`BILL UPDATED \n`, updatedBill);
    return updatedBill;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { updateBill, updateUser };
