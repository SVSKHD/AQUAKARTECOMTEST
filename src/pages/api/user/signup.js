import AquaEcomUser from "@/Backend/models/user"; // Adjust the path as necessary
import { createRouter } from "next-connect";
import db from "@/utils/db";
import bcrypt from "bcryptjs";
import shortid from "shortid";
import signupEmail from "@/utils/emailTemplates/signup";
import { sendEmail } from "@/utils/emailTemplates/sendEmail";

const router = createRouter();

router.post(async (req, res) => {
  await db.connectDb();
  const { email, password } = req.body;

  try {
    const normalizedEmail = email.toLowerCase();
    const userExist = await AquaEcomUser.findOne({ email: normalizedEmail });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const uniqueId = `AQC-${shortid.generate()}`;
    const user = await AquaEcomUser.create({
      id: uniqueId,
      email: normalizedEmail,
      password: password, // Store the hashed password, not the plain one
    });

    // Optionally send confirmation email or any other post-creation process
    // await sendEmail(user.email, signupEmail());

    const emailDetails = {
      email: user.email,
      subject: "Signup Confirmtaion",
      content: signupEmail(user.email),
    };

    await sendEmail({ body: emailDetails }, res);

    res
      .status(201)
      .json({ message: "User created successfully", userId: user.id });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ message: "Error signing up user", error: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler();
