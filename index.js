const express = require("express");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());

app.use(express.json());

app.use("/", require("./routes"));

app.options("*", cors());

app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});
