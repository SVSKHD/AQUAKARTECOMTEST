// pages/api/verify-otp.js

import AquaEcomUser from "@/Backend/models/user";
import { createRouter } from "next-connect";
import bcrypt from "bcryptjs";
import db from "@/utils/db";

const router = createRouter();

router.post(async (req, res) => {
    const { email, otp, newPassword } = req.body;

    await db.connectDb();

    try {
        const user = await AquaEcomUser.findOne({
            email: email.toLowerCase(),
            resetPasswordToken: otp,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: "Password has been reset successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error resetting password", error: error.message });
    } finally {
        await db.disconnectDb();
    }
});

export default router.handler();
