import nodemailer from "nodemailer";

export default async (req, res) => {
  const { email, subject, message } = req.body;

  // Create a transporter
  let transporter = nodemailer.createTransport({
    service: "your-email-provider", // e.g., 'Gmail', 'Yahoo', etc.
    auth: {
      user: "your-email@example.com",
      pass: "your-email-password",
    },
  });

  // Set up email data
  let mailOptions = {
    from: '"Your Name" <your-email@example.com>',
    to: email, // Recipient's email
    subject: subject,
    text: message,
    // html: "<b>Hello world?</b>", // If you want to send HTML formatted email
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json({ message: "Email sent successfully!", info });
  });
};
