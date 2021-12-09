const express = require("express");
const bcrypt = require("bcrypt");
const {
  createUser,
  deleteUser,
  updateUser,
  getUserByUsername,
  getBillsByUserID,
  getUserByID,
} = require("../db/exports");

const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

userRouter.get("/me", async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const user = await getUserByID(user_id);
    const bills = await getBillsByUserID(user_id);
    res.send({ user, bills });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.post("/register", async (req, res, next) => {
  try {
    const { user } = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await createUser(user);
    const token = jwt.sign(
      { user_id: newUser.user_id },
      process.env.JWT_SECRET
    );
    const msg = {
      to: newUser.email,
      from: {
        email: "jimsbillpayapp@gmail.com",
        name: "Bill Tracker",
      },
      subject: "Thanks for signing up!",
      text: "Welcome to Jims Bill Tracker! Thanks for signing up!",
    };
    await sgMail.send(msg);
    res.send({
      message: "Thanks for signing up!",
      user: newUser,
      bills: [],
      token,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

userRouter.post("/login", async (req, res, next) => {
  try {
    const { user } = req.body;
    const existingUser = await getUserByUsername(user.username);

    if (!existingUser) {
      next({
        name: "Login Error",
        message: "Invalid login, try again",
      });
    }
    if (await bcrypt.compare(user.password, existingUser.password)) {
      delete existingUser.password;
      const token = jwt.sign(
        { user_id: existingUser.user_id },
        process.env.JWT_SECRET
      );
      const bills = await getBillsByUserID(existingUser.user_id);
      res.send({
        message: "You have logged in!",
        user: existingUser,
        bills,
        token,
      });
    } else {
      next({
        name: "Login Error",
        message: "Invalid login, try again",
      });
    }
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/me", async (req, res, next) => {
  try {
    const { updateData } = req.body;
    const { user_id } = req.user;

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const updatedUser = await updateUser(user_id, updateData);
    delete updatedUser.password;
    res.send({ message: "User updated!", user: updatedUser });
  } catch (error) {
    next(error);
  }
});

userRouter.patch("/me/password", async (req, res, next) => {
  try {
    const { updateData } = req.body;
    const { user_id } = req.user;
    updateData.password = await bcrypt.hash(updateData.password, 10);

    const updatedUser = await updateUser(user_id, updateData);
    delete updatedUser.password;
    const msg = {
      to: updatedUser.email,
      from: {
        email: "jimsbillpayapp@gmail.com",
        name: "Bill Tracker",
      },
      subject: "Password Change",
      text: "Your password has been changed",
    };
    await sgMail.send(msg);
    res.send({ message: "Password updated!", user: updatedUser });
  } catch (error) {
    next(error);
  }
});

userRouter.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_id } = req.user;
    if (id === user_id) {
      const deletedUser = await deleteUser(user_id);
      res.send({ message: "User deleted!", user: deletedUser });
    } else {
      res.send({ message: "You do not have access to this" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { userRouter };
