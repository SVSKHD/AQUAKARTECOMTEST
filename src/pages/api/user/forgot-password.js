// pages/api/forgot-password.js

import AquaEcomUser from "@/Backend/models/user"; // Adjust the path as necessary
import { createRouter } from "next-connect";
import db from "@/utils/db";
import forgotPasword from "../emailTemplates/forgotPassword";

const router = createRouter();

router.post(async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.toLowerCase();

  await db.connectDb();

  try {
    const user = await AquaEcomUser.findOne({ email: normalizedEmail });
    if (!user) {
      await db.disconnectDb();
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const tokenExpireTime = Date.now() + 3600000; // 1 hour from now

    user.resetPasswordToken = otp; // Store OTP instead of a reset token
    user.resetPasswordExpires = tokenExpireTime; // Expire time for the OTP
    await user.save();

    // Send OTP via email using the generic send-email API endpoint
    // await fetch(`https://aquakart.co.in/api/send-email`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: user.email,
    //     subject: "Your Password Reset Code",
    //     message: "Aquakart Password Reset Otp",
    //     content: forgotPasword(user.email, otp),
    //   }),
    // });

    res
      .status(200)
      .json({ message: "OTP for password reset has been sent to your email." });
  } catch (error) {
    console.error("Forgot Password Error: ", error);
    res.status(500).json({
      message: "Error processing forgot password request",
      error: error.message,
    });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler();
