// import AquaEcomUser from "@/Backend/models/user"; // Adjust the path as necessary
// import { createRouter } from "next-connect";
// import db from "@/utils/db";
// import bcrypt from "bcryptjs";
// import shortid from "shortid";
// import signupEmail from "@/utils/emailTemplates/signup";
// import { sendEmail } from "@/utils/emailTemplates/sendEmail";

// const router = createRouter();

// router.post(async (req, res) => {
//   await db.connectDb();
//   const { email, password } = req.body;

//   try {
//     const normalizedEmail = email.toLowerCase();
//     const userExist = await AquaEcomUser.findOne({ email: normalizedEmail });
//     if (userExist) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const uniqueId = `AQC-${shortid.generate()}`;
//     const user = await AquaEcomUser.create({
//       id: uniqueId,
//       email: normalizedEmail,
//       password: password, // Store the hashed password, not the plain one
//     });

//     // Optionally send confirmation email or any other post-creation process
//     // await sendEmail(user.email, signupEmail());

//     const emailDetails = {
//       email: user.email,
//       subject: "Signup Confirmtaion",
//       content: signupEmail(user.email),
//     };

//     res
//       .status(201)
//       .json({ message: "User created successfully", userId: user.id });
//       await sendEmail({ body: emailDetails }, res);
//   } catch (error) {
//     console.error("Signup error:", error);
//     res
//       .status(500)
//       .json({ message: "Error signing up user", error: error.message });
//   } finally {
//     await db.disconnectDb();
//   }
// });

// export default router.handler();

// import AquaEcomUser from "@/Backend/models/user";
// import db from "@/utils/db";
// import {createRouter} from "next-connect";

// const router = createRouter();

// router.post(async (req, res) => {
//   const { email, password, username } = req.body;
//   await db.connectDb();

//   const userExists = await AquaEcomUser.findOne({ email });
//   if (userExists) {
//     await db.disconnectDb();
//     return res.status(409).json({ message: "Email already in use" });
//   }

//   const user = new AquaEcomUser({
//     email,
//     password,
//     username,
//   });

//   await user.save(); // This will automatically hash the password because of pre save hook

//   const token = user.getJwtToken(); // Get JWT token after saving
//   res.status(201).json({ message: "User created successfully", token });
//   await db.disconnectDb()
// });

// export default router.handler() ;

// import { createRouter } from "next-connect";
// import AquaEcomUser from "@/Backend/models/user"; // Adjust the import path as necessary
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import db from "@/utils/db";

// const App = createRouter();

// App.post(async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Connect to MongoDB
//     await db.connectDb();

//     // Check if user already exists
//     let user = await AquaEcomUser.findOne({ email: email.toLowerCase() });

//     if (user) {
//       return res.status(409).send("User already exists.");
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user
//     user = new AquaEcomUser({
//       email,
//       password: hashedPassword,
//     });

//     await user.save();

//     // Create JWT payload
//     const payload = {
//       user: {
//         id: user.id,
//       },
//     };

//     // Sign the token
//     const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     res.status(200).json({ success: true, user: payload.user, token: token });
//     await db.disconnectDb();
//   } catch (error) {
//     await db.connectDb();
//     console.error(error.message);
//     res.status(500).send("please send valid details");
//     await db.disconnectDb();
//   }
// });

// export default App.handler();

import { createRouter } from "next-connect";
import AquaEcomUser from "@/Backend/models/user"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/utils/db";

const App = createRouter();

App.post(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Connect to MongoDB
    await db.connectDb();

    // Check if user already exists
    let user = await AquaEcomUser.findOne({ email: email.toLowerCase() });

    if (user) {
      return res.status(409).send("User already exists.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new AquaEcomUser({
      email,
      password: hashedPassword,
    });

    await user.save();

    // Create JWT payload
    const payload = {
      user: {
        id: user.id,
      },
    };

    // Sign the token
    const token = jwt.sign(payload, process.env.NEXT_PUBLIC_JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).json({ success: true, user: payload.user, token: token });
    await db.disconnectDb();
  } catch (error) {
    await db.connectDb();
    console.error(error.message);
    res.status(500).send("please send valid details");
    await db.disconnectDb();
  }
});

export default App.handler();
