
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();

var corsOptions = { origin: true, optionsSuccessStatus: 200 };

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to api" });
});

require("./src/routes/routes")(app)

// set port, listen for requests
const PORT =  3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});