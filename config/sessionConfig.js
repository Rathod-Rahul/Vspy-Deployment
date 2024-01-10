const session = require("express-session");
require("dotenv").config();
module.exports = session({
  secret: process.env.SESSION_SECRET,
  name: process.env.SESSION_NAME,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: parseInt(process.env.SESSION_LIFETIME),
    secure: false, // Set to true if your app is served over HTTPS
    httpOnly: true,
  },
});
