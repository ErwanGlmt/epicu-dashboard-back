const express = require("express");
const cors = require("cors");
require("dotenv").config(); //read environment variables
const PORT = process.env.PORT || 5000;
const app = express();

// Allow requests from all origins
app.use(cors());

// Middleware to parse JSON data in request body
app.use(express.json());

// Import routes
app.use("/", require("./routes"));

// Middleware to handle CORS preflight requests
app.options("*", cors());

app.listen(PORT, () => {
  console.log("Server listening on port:", PORT);
});
