const { createBill, createUser } = require("./_Create.js");
const { getBillsByUserID, getUserByID, getUserByUsername } = require("./_Read.js");
const { updateBill, updateUser } = require("./_Update.js");
const { deleteBill, deleteUser } = require("./_Delete.js");

module.exports = {
  createBill,
  createUser,
  deleteBill,
  deleteUser,
  getBillsByUserID,
  getUserByID,
  getUserByUsername,
  updateBill,
  updateUser,
};
