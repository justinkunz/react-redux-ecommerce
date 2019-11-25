const nodeMailer = require("nodemailer");
require("dotenv").config();

const { EMAIL_USER, EMAIL_PW } = process.env;

const transporter = nodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PW
  }
});

module.exports = (to, subject, html) => {
  return new Promise(resolve => {
    const mailOptions = { to, subject, html };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return resolve({
          status: "error",
          desc: err
        });
      }

      return resolve({ status: "success" });
    });
  });
};
