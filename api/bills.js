const express = require("express");
const { createBill } = require("../db/_Create");
const { deleteBill } = require("../db/_Delete");
const { getBillsByUserID } = require("../db/_Read");
const { updateBill } = require("../db/_Update");
const billRouter = express.Router();

billRouter.get("/", async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const bills = await getBillsByUserID(user_id);
    res.send(bills);
  } catch (error) {
    next(error);
  }
});

billRouter.post("/", async (req, res, next) => {
  try {
    const { billData } = req.body;
    billData.user_id = req.user.user_id;
    const addedBill = await createBill(billData);
    res.send(addedBill);
  } catch (error) {
    next(error);
  }
});

billRouter.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { updateData } = req.body;

    const updatedBill = await updateBill(id, updateData);
    res.send(updatedBill);
  } catch (error) {
    next(error);
  }
});

billRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedBill = await deleteBill(id);
    res.send(deletedBill);
  } catch (error) {
    next(error);
  }
});

module.exports = { billRouter };
