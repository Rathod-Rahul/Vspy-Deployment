// const mysql = require("mysql");
// require("dotenv").config();
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_DATABASE,
//   port: process.env.DB_PORT,
// });

// // Connect to the database
// const Dconnection = connection.connect((error) => {
//   if (error) {
//     console.error("Error connecting to MySQL:", error.message);
//     return;
//   }
//   console.log("Connected to MySQL database");
// });

// module.exports = connection;
const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

// Ensure a consistent way to handle connection errors
connection.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  }

  if (connection) {
    connection.release(); // Release the connection back to the pool.
    console.log("Connected to MySQL database");
  }

  return;
});

module.exports = connection;
