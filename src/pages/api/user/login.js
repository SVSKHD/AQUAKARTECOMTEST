import AquaEcomUser from "@/Backend/models/user"; // Adjust the path as necessary
import { createRouter } from "next-connect";
import db from "@/utils/db";
import CustomError from "@/Backend/utils/customError";
const jwt = require("jsonwebtoken");

const router = createRouter();

router.post(async (req, res, next) => {
  db.connectDb();
  try {
    const { email, password } = req.body;

    // check for presence of email and password
    if (!email || !password) {
      return next(new CustomError("please provide email and password", 400));
    }

    // get user from DB
    const user = await AquaEcomUser.findOne({ email }).select("+password");

    // if user not found in DB
    if (!user) {
      return next(
        new CustomError("Email or password does not match or exist", 400),
      );
    }

    // match the password
    const isPasswordCorrect = await user.isValidatedPassword(password);

    //if password do not match
    if (!isPasswordCorrect) {
      return next(
        new CustomError("Email or password does not match or exist", 400),
      );
    }

    // If password matches, proceed to generate the JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.NEXT_PUBLIC_JWT_SECRET,
      { expiresIn: process.env.NEXT_JWT_EXPIRES_IN },
    );
    const sanitizedUser = user.toObject();
    delete sanitizedUser.password;

    res
      .status(200)
      .json({ message: "User signed in successfully", sanitizedUser, token });
  } catch (error) {
    console.error("Error during sign in:", error);
    res.status(500).json({ message: "Error signing in", error: error.message });
  } finally {
    await db.disconnectDb();
  }
});

export default router.handler();
