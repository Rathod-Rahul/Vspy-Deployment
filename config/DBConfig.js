const mysql = require("mysql");
require("dotenv").config();
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// Connect to the database
const Dconnection = connection.connect((error) => {
  if (error) {
    console.error("Error connecting to MySQL:", error.message);
    return;
  }
  console.log("Connected to MySQL database");
});

module.exports = connection;