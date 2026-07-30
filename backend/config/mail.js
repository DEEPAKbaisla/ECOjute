import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

console.log("Email " + process.env.EMAIL + " is ready to send emails.");
console.log(
  "Email password " + process.env.EMAIL_PASS + " is ready to send emails.",
);

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
