
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await transporter.sendMail({
      from: `"EcoJute" <${process.env.EMAIL}>`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.log(error);
    throw new Error("Email sending failed");
  }
};
