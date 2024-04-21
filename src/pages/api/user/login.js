// import AquaEcomUser from "@/Backend/models/user"; // Adjust the path as necessary
// import { createRouter } from "next-connect";
// import db from "@/utils/db";
// const jwt = require("jsonwebtoken");

// const router = createRouter();

// // router.post(async (req, res) => {
// //   await db.connectDb();
// //   try {
// //     const { email, password } = req.body;

// //     // Check for presence of email and password
// //     if (!email || !password) {
// //       return res.status(400).json({ message: "Please provide email and password" });
// //     }

// //     // Get user from DB
// //     const user = await AquaEcomUser.findOne({ email }).select("+password");

// //     // If user not found in DB
// //     if (!user) {
// //       return res.status(400).json({ message: "Email or password does not match or exist" });
// //     }

// //     // Match the password
// //     const isPasswordCorrect = await user.isValidatedPassword(password);

// //     // If password does not match
// //     if (!isPasswordCorrect) {
// //       return res.status(400).json({ message: "Email or password does not match or exist" });
// //     }

// //     // If password matches, proceed to generate the JWT token
// //     const token = jwt.sign(
// //       { id: user._id },
// //       process.env.NEXT_PUBLIC_JWT_SECRET,
// //       { expiresIn: process.env.NEXT_JWT_EXPIRES_IN }
// //     );

// //     const sanitizedUser = user.toObject();
// //     delete sanitizedUser.password;

// //     res.status(200).json({ message: "User signed in successfully", sanitizedUser, token });
// //   } catch (error) {
// //     console.error("Error during sign in:", error);
// //     res.status(500).json({ message: "Error signing in", error: error.message });
// //   } finally {
// //     await db.disconnectDb();
// //   }
// // });

// router.post(async (req, res) => {
//   await db.connectDb();
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res.status(400).json({ message: "Please provide both email and password" });
//     }
//     const user = await AquaEcomUser.findOne({ email }).select("+password");
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const isPasswordCorrect = await user.isValidatedPassword(password);
//     if (!isPasswordCorrect) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }
//     const token = user.getJwtToken();
//     res.status(200).json({ message: "Login successful", token });
//   } catch (error) {
//     console.error("Login error:", error);
//     res.status(500).json({ message: "Internal server error", error: error.message });
//   } finally {
//     await db.disconnectDb();
//   }
// });

// export default router.handler();

// import { createRouter } from "next-connect";
// import AquaEcomUser from "@/Backend/models/user"; // Adjust the import path as necessary
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import db from "@/utils/db";

const router = createRouter();

// App.post(async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     db.connectDb();

//     const user = await AquaEcomUser.findOne({ email: email.toLowerCase() });
//     if (!user) {
//       return res.status(404).send("User not found.");
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).send("Invalid credentials.");
//     }

//     // Create JWT payload
//     const payload = {
//       user: {
//         id: user._id,
//         email: user.email,
//       },
//     };

//     // Sign the token
//     const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
//       expiresIn: "3h",
//     });
//     res.status(200).json({ success: true, user: payload.user, token: token });
//     db.disconnectDb();
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Server error");
//     db.disconnectDb();
//   }
// });

import { createRouter } from "next-connect";
import User from "@/Backend/models/user"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/utils/db";

const App = createRouter();

App.post(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Connect to MongoDB
    db.connectDb();

    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).send("User not found.");
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send("Invalid credentials.");
    }

    // Create JWT payload
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    // Sign the token
    const token = jwt.sign(sanitizedUser, process.env.NEXT_PUBLIC_JWT_SECRET, {
      expiresIn: "3h",
    });
    res.status(200).json({ success: true, user: sanitizedUser, token: token });
    db.disconnectDb();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
    db.disconnectDb();
  }
});

export default App.handler();
