import { createRouter } from "next-connect";
import AquaEcomUser from "@/Backend/models/user"; // Adjust the import path as necessary
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "@/utils/db";
import signupEmail from "@/utils/emailTemplates/signup";
import sendEmail from "@/utils/emailTemplates/sendEmail";
import {nanoid} from "nanoid"

const App = createRouter();

App.post(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Connect to MongoDB
    await db.connectDb();

    // Check if user already exists
    let user = await AquaEcomUser.findOne({ email: email.toLowerCase() });

    if (user) {
      await db.disconnectDb();
      return res.status(409).send("User already exists.");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = `AQC-${nanoid(8)}`
    // Create a new user
    user = new AquaEcomUser({
      id:id,
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

    // Send email
    const emailContent = signupEmail(user.email); // This function should return the HTML content of the email
    const emailResult = await sendEmail({
      email: user.email,
      subject: "Welcome to AquaKart!",
      message: "Thanks for signing up with us!",
      content: emailContent,
    });

    const finalResponse = {
      success: true,
      user: {
        id: user.id,
        email: user.email,
      },
      token: token,
      emailSent: emailResult.success,
      emailMessage: emailResult.message,
    };

    res.status(200).json(finalResponse);

    await db.disconnectDb();
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Please send valid details");
    await db.disconnectDb();
  }
});

export default App.handler();
