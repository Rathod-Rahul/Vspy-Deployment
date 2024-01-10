// const jwt = require("jsonwebtoken");

// function authenticateToken(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) {
//     return res.redirect("/error");

//     // res.status(401).json({ message: "Unauthorized: Missing token" });
//   }

//   jwt.verify(token, "rathodrahul", (err, user) => {
//     if (err) {
//       return res.status(403).json({ message: "Forbidden: Invalid token" });
//     }

//     req.user = user;
//     next();
//   });
// }

// module.exports = authenticateToken;

const jwt = require("jsonwebtoken");
require("dotenv").config();
function authenticateToken(req, res, next) {
  const token = req.cookies.token; // Assuming you are storing the token in a cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET); // Use the same secret key as used during token generation
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}

module.exports = authenticateToken;
