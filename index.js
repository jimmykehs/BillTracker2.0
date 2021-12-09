const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const { client } = require("./db");
const { apiRouter } = require("./api");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));
app.use(cors());

app.use("/api", apiRouter);

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  client.connect();
  console.log(`Server is up on ${PORT}`);
});
