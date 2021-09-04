const nodemailer = require("nodemailer");

/**
 * Auth with Google
 */
function init() {
  try {
    if (!process.env.MAIL_USERNAME || !process.env.MAIL_PASSWORD){
        console.log("No config for email. Exit!")
        process.exit()
    }
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // verify configuration
    transporter.verify(function (error, success) {
      if (error) {
        console.log("Init mail sender failure ", error);
      } else {
        console.log("Init mail sender successfully");
      }
    });
  } catch (error) {
    console.log("Init mail sender failure ", error);
  }
}

/**
 * Send a email
 */
function sendMail(email, title, body) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    const mailOptions = {
      html: body,
      subject: title,
      to: email,
    };

    return transporter
      .sendMail(mailOptions)
}

module.exports = {
  init,
  sendMail,
};
