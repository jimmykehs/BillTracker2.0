require("dotenv").config();
const express = require("express");
const { userRouter } = require("./users");
const { billRouter } = require("./bills");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");

apiRouter.use(async (req, res, next) => {
  try {
    const prefix = "Bearer ";
    const auth = req.header("Authorization");
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);
      const user = jwt.verify(token, process.env.JWT_SECRET);
      if (user) {
        req.user = user;
        next();
      }
    } else {
      next({
        name: "Header Error",
        message: "Authorization must start with 'Bearer'",
      });
    }
  } catch (err) {
    next(err);
  }
});

apiRouter.use("/user", userRouter);
apiRouter.use("/bill", billRouter);
apiRouter.use((err, req, res, next) => {
  console.log(`ERR MIDDLEWARE \n`, err);
  res.status(500).send({ name: err.name, error: err.error });
});

module.exports = { apiRouter };
