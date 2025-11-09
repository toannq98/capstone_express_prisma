// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "nongquoctoan.dev@gmail.com",
    pass: "zgkwmtkqhhqmvfqe",
  },
});

export const sendEmail = async (emailTo) => {
  const info = await transporter.sendMail({
    from: '"Toannq" <nongquoctoan.dev@gmail.com>',
    to: emailTo,
    subject: "Hello ✔",
    text: "Hello world?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body, k dùng được flex
  });

  console.log("Message sent:", info.messageId);
}

// Wrap in an async IIFE so we can use await.
// (async () => {
//   const info = await transporter.sendMail({
//     from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
//     to: "bar@example.com, baz@example.com",
//     subject: "Hello ✔",
//     text: "Hello world?", // plain‑text body
//     html: "<b>Hello world?</b>", // HTML body
//   });

//   console.log("Message sent:", info.messageId);
// })();
