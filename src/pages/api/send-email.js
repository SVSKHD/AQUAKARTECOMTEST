/* eslint-disable import/no-anonymous-default-export */
import nodemailer from "nodemailer";

export default async (req, res) => {
  // Destructure and default values ensure no undefined errors
  const { email = "", subject = "", message = "" } = req.body;

  // Using environment variables for sensitive information
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aquakart8@gmail.com", // Use environment variable
      pass: "vpyzejrvgbhkjdbe", // Use environment variable
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"Fred Foo 👻" aquakart8@gmail.com>`, // Use your actual email
      to: email,
      subject: subject,
      text: message,
      html: `<b>${message}</b>`, // Consider sanitizing message to prevent HTML injection
    });

    console.log("Message sent: %s", info.messageId); // Logging the messageId which is useful for debugging
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*"); // Or specify your client's URL
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    res
      .status(200)
      .json({ message: "Email Sent Successfully", messageId: info.messageId });
  } catch (error) {
    console.error("Failed to send email:", error);
    res
      .status(500)
      .json({ message: "Failed to Send Email", error: error.message });
  }
};
