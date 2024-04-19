import AquaEcomUser from "@/Backend/models/user"; // Adjust the path as necessary
import { createRouter } from "next-connect";
import bcrypt from "bcryptjs";
import db from "@/utils/db";
import shortid from "shortid";
import signupEmail from "@/utils/emailTemplates/signup";
import { sendEmail } from "@/utils/emailTemplates/sendEmail";

const router = createRouter();

router.post(async (req, res) => {
  const { email, password } = req.body;
  const normalizedEmail = email.toLowerCase();
  db.connectDb();
  try {
    // Check if the user already exists
    const userExists = await AquaEcomUser.findOne({ email: normalizedEmail });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Generate unique ID prefixed with "AQB"
    const uniqueId = `AQB-${shortid.generate()}`;

    // Hash the password

    // Create a new user
    const user = await AquaEcomUser.create({
      id: uniqueId,
      email: normalizedEmail,
      password: password, // Store the hashed password
    });

    const emailDetails = {
      email: user.email,
      subject: "Signup Confirmtaion",
      content: signupEmail(user.email),
    };

    // Sending the OTP via email
    await sendEmail({ body: emailDetails }, res);

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
  db.disconnectDb();
});

export default router.handler();
