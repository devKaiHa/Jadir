const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "mail.jadirconsult.com",
  port: 465,
  secure: true,
  auth: {
    user: "no-reply@jadirconsult.com",
    pass: ")!hZdz=;5N?x",
  },
});

const sendEmail = async (options) => {
  try {
    const mailOpts = {
      from: `"JadirConsult" <no-reply@jadirconsult.com>`,
      to: options.to,
      replyTo: options.replyTo,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments || [],
    };

    //3-Send email
    await transporter.sendMail(mailOpts);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
