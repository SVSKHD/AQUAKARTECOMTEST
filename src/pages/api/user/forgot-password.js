// pages/api/forgot-password.js

import AquaEcomUser from "@/Backend/models/user"; // Adjust the path as necessary
import { createRouter } from "next-connect";
import db from "@/utils/db";
import forgotPassword from "@/utils/emailTemplates/forgotPassword";
import sendEmail from "@/utils/emailTemplates/sendEmail";

const router = createRouter();

router.post(async (req, res) => {
  const { email } = req.body;
  const normalizedEmail = email.toLowerCase();

  await db.connectDb();

  try {
    const user = await AquaEcomUser.findOne({ email: normalizedEmail });
    if (!user) {
      await db.disconnectDb();
      return res.status(404).json({ message: "Email not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
    const tokenExpireTime = Date.now() + 3600000; // 1 hour from now

    user.resetPasswordOtp = otp;
    user.resetPasswordExpires = tokenExpireTime;
    await user.save();

    const emailContent = forgotPassword(user.email, otp);
    // Sending the OTP via email
    const emailResult = await sendEmail({
      email: user.email,
      subject: "Your Password Reset Code",
      text: "Please use the following code to reset your password.",
      content: emailContent,
    });

    res
      .status(200)
      .json({
        message: "OTP for password reset has been sent to your email.",
        emailSent: emailResult.success,
        emailMessage: emailResult.emailMessage,
      });
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
