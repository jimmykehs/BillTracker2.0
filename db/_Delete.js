const { client } = require("./index");

async function deleteUser(user_id) {
  try {
    const query = `DELETE FROM users WHERE user_id = $1 RETURNING *`;
    const { rows } = await client.query(query, [user_id]);
    return rows;
  } catch (err) {
    console.log(`COULD NOT DELETE USER, \n`, err);
    throw err;
  }
}

async function deleteBill(bill_id) {
  try {
    const query = `DELETE FROM bills WHERE bill_id = ($1) RETURNING *;`;
    const {
      rows: [deletedBill],
    } = await client.query(query, [bill_id]);
    return deletedBill;
  } catch (err) {
    console.log(`COULD NOT DELETE BILL, \n`, err);
    throw err;
  }
}

module.exports = { deleteBill, deleteUser };
