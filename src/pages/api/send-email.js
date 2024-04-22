/* eslint-disable import/no-anonymous-default-export */
import nodemailer from "nodemailer";

// Define the sendEmail function
async function sendEmail(req, res) {
  const { email = "", subject = "", message = "", content = "" } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aquakart8@gmail.com", // Use environment variable
      pass: "vpyzejrvgbhkjdbe", // Use environment variable
    },
  });

  try {
    const info = await transporter.sendMail({
      from: `"AquaKart" <${process.env.EMAIL_USERNAME}>`,
      to: email,
      subject: subject,
      text: message,
      html: content,
    });

    console.log("Message sent: %s", info.messageId);
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
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
}

export default sendEmail
