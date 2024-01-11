const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const queryDb = require("../utils/DBhelper");
const cookieParser = require("cookie-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

// // Registration controller function
// async function register(req, res) {
//   try {
//     const { username, email, password } = req.body;

//     // Basic input validation
//     if (!username || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     // Check if the user already exists
//     const checkUserQuery = "SELECT * FROM users WHERE email = ?";
//     const existingUser = await queryDb(checkUserQuery, [email]);

//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Insert user into the database
//     const insertUserQuery =
//       "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
//     const insertedUser = await queryDb(insertUserQuery, [
//       username,
//       email,
//       hashedPassword,
//     ]);

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: insertedUser.insertId, username, email },
//       "rathodrahul",
//       { expiresIn: "1h" }
//     );

//     // Set the token as a cookie
//     res.cookie("token", token, { httpOnly: true });

//     // Redirect to login page
//     res.redirect("/login");
//   } catch (error) {
//     console.error("Registration error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }
// register with flash
// Registration controller function
async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Basic input validation
    if (!username || !email || !password) {
      req.flash("error", "All fields are required");
      return res.redirect("/register"); // Redirect to register page or wherever appropriate
    }

    // Check if the user already exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const existingUser = await queryDb(checkUserQuery, [email]);

    if (existingUser.length > 0) {
      req.flash("error", "User already exists");
      return res.redirect("/register"); // Redirect to register page or wherever appropriate
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    const insertUserQuery =
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
    const insertedUser = await queryDb(insertUserQuery, [
      username,
      email,
      hashedPassword,
    ]);

    // Generate JWT token
    const token = jwt.sign(
      { userId: insertedUser.insertId, username, email },
      process.env.SESSION_SECRET,
      { expiresIn: process.env.SESSION_LIFETIME }
    );

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    // Flash a success message
    req.flash("success", "Registration successful");

    // Redirect to login page
    res.redirect("/login");
  } catch (error) {
    console.error("Registration error:", error);

    // Flash an error message
    req.flash("error", "Internal Server Error");

    res.redirect("/register"); // Redirect to register page or wherever appropriate
  }
}

//  register wtith flash end
// ===============================================

// // Login controller function
// async function login(req, res) {
//   try {
//     const { email, password } = req.body;

//     // Basic input validation
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ message: "Email and password are required" });
//     }

//     // Check if the user exists
//     const checkUserQuery = "SELECT * FROM users WHERE email = ?";
//     const user = await queryDb(checkUserQuery, [email]);

//     if (user.length === 0) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Verify the password
//     const isPasswordValid = await bcrypt.compare(password, user[0].password);

//     if (!isPasswordValid) {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       { userId: user[0].id, username: user[0].username, email },
//       "rathodrahul",
//       { expiresIn: "1h" }
//     );

//     // Set the token as a cookie
//     res.cookie("token", token, { httpOnly: true });

//     // Redirect to the dashboard page after successful login
//     res.redirect("/dashboard");
//     // res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }
// ============================login with flash
// Login controller function
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Basic input validation
    if (!email || !password) {
      req.flash("error", "Email and password are required");
      return res.redirect("/login"); // Redirect to login page or wherever appropriate
    }

    // Check if the user exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const user = await queryDb(checkUserQuery, [email]);

    if (user.length === 0) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login"); // Redirect to login page or wherever appropriate
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user[0].password);

    if (!isPasswordValid) {
      req.flash("error", "Invalid email or password");
      return res.redirect("/login"); // Redirect to login page or wherever appropriate
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user[0].id, username: user[0].username, email },
      process.env.SESSION_SECRET,
      { expiresIn: process.env.SESSION_LIFETIME }
    );

    // Set the token as a cookie
    res.cookie("token", token, { httpOnly: true });

    // Flash a success message
    req.flash("success", "Login successful");

    // Redirect to the dashboard page after successful login
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Login error:", error);

    // Flash an error message
    req.flash("error", "Internal Server Error");

    res.redirect("/login"); // Redirect to login page or wherever appropriate
  }
}

// Logout
function logout(req, res) {
  // Clear the token cookie
  res.clearCookie("token");

  // Redirect to the login page or any other desired page after logout
  res.redirect("/login");
}

// // forgot password
// async function forgotPassword(req, res) {
//   try {
//     const { email } = req.body;
//     console.log(email);
//     // Basic input validation
//     if (!email) {
//       return res.status(400).json({ message: "Email is required" });
//     }

//     // Check if the user exists
//     const checkUserQuery = "SELECT * FROM users WHERE email = ?";
//     const user = await queryDb(checkUserQuery, [email]);

//     if (user.length === 0) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate a unique token
//     const token = jwt.sign({ userId: user[0].id }, "rathodrahul", {
//       expiresIn: "1h",
//     });

//     // Update the user record with the reset token (you may need to add a column in your users table)
//     const updateTokenQuery = "UPDATE users SET reset_token = ? WHERE id = ?";
//     await queryDb(updateTokenQuery, [token, user[0].id]);

//     // Send the reset link to the user's email
//     const resetLink = `http://localhost:3000/reset/${token}`; //localhost:3000/
//     http: sendResetEmail(email, resetLink);

//     res.json({ message: "Password reset email sent successfully" });
//   } catch (error) {
//     console.error("Forgot password error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// }

// forgot password with flash
// Forgot password controller function
async function forgotPassword(req, res) {
  try {
    const { email } = req.body;

    // Basic input validation
    if (!email) {
      req.flash("error", "Email is required");
      return res.redirect("/forgot"); // Redirect to forgot password page or wherever appropriate
    }

    // Check if the user exists
    const checkUserQuery = "SELECT * FROM users WHERE email = ?";
    const user = await queryDb(checkUserQuery, [email]);

    if (user.length === 0) {
      req.flash("error", "User not found");
      return res.redirect("/forgot"); // Redirect to forgot password page or wherever appropriate
    }

    // Generate a unique token
    const token = jwt.sign({ userId: user[0].id }, process.env.SESSION_SECRET, {
      expiresIn: process.env.SESSION_LIFETIME,
    });

    // Update the user record with the reset token (you may need to add a column in your users table)
    const updateTokenQuery = "UPDATE users SET reset_token = ? WHERE id = ?";
    await queryDb(updateTokenQuery, [token, user[0].id]);

    // Send the reset link to the user's email
    const resetLink = `https://vspy.onrender.com/reset/${token}`;
    sendResetEmail(email, resetLink);

    // Flash a success message
    req.flash("success", "Password reset email sent successfully");

    res.redirect("/forgot"); // Redirect to forgot password page or wherever appropriate
  } catch (error) {
    console.error("Forgot password error:", error);

    // Flash an error message
    req.flash("error", "Internal Server Error");

    res.redirect("/forgot"); // Redirect to forgot password page or wherever appropriate
  }
}

// // forgot password end

// Function to send reset password email
function sendResetEmail(email, resetLink) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: "support@Vspy.com",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Email sending error:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
}

// function that reset
async function resetPassword(req, res) {
  try {
    const { token, newPassword } = req.body;

    // Verify the token
    const decoded = jwt.verify(token, process.env.SESSION_SECRET); // Use the same secret key as used during token generation

    const user = await queryDb("SELECT * FROM users WHERE id = ?", [
      decoded.userId,
    ]);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user's password (you would normally hash the password)
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await queryDb(
      "UPDATE users SET password = ?, reset_token = NULL WHERE id = ?",
      [hashedPassword, user[0].id]
    );

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

// deleteaccount
// Delete account controller function
async function deleteAccount(req, res) {
  try {
    const userId = req.userId; // Assuming you have middleware to extract userId from the token

    // Check if the user exists
    const checkUserQuery = "SELECT * FROM users WHERE id = ?";
    const user = await queryDb(checkUserQuery, [userId]);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete the user from the database
    const deleteQuery = "DELETE FROM users WHERE id = ?";
    await queryDb(deleteQuery, [userId]);

    // Clear the token cookie
    res.clearCookie("token");

    // Redirect to the login page or any other desired page after account deletion
    res.redirect("/login");
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// Update user info controller function
async function updateUserInfo(req, res) {
  try {
    const { username, email } = req.body;
    const userId = req.userId; // Assuming you have middleware to extract userId from the token
    // Basic input validation
    if (!username || !email) {
      return res
        .status(400)
        .json({ message: "Username and email are required" });
    }

    // Check if the user exists
    const checkUserQuery = "SELECT * FROM users WHERE id = ?";
    const user = await queryDb(checkUserQuery, [userId]);

    if (!user || user.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user information in the database
    const updateQuery = "UPDATE users SET username = ?, email = ? WHERE id = ?";
    await queryDb(updateQuery, [username, email, userId]);

    res.json({ message: "User information updated successfully" });
  } catch (error) {
    console.error("Update user info error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

module.exports = {
  register,
  login,
  logout,
  forgotPassword,
  resetPassword,
  deleteAccount,
  updateUserInfo,
};
