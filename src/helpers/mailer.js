require("dotenv").config();
const nodemailer = require("nodemailer");
async function sendEmail(email, code) {
  try {
    const smtpEndpoint = "smtp.sendgrid.net";
    const port = 465;
    const senderAddress = `example@gmail.com`;//your email
    var toAddress = email;
    const smtpUsername = "apikey";
    const smtpPassword = process.env.SG_APIKEY;
    var subject = "Verify your email";
   
    var body_html = `<!DOCTYPE> 
    <html>
      <body>
        <p>Your authentication code is : </p> <b>${code}</b>
      </body>
    </html>`;
    // Creating SMTP transport.
    let transporter = nodemailer.createTransport({
      host: smtpEndpoint,
      port: port,
      secure: true, 
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });
    // Specify the fields in the email.
    let mailOptions = {
      from: senderAddress,
      to: toAddress,
      subject: subject,
      html: body_html,
    };
    let info = await transporter.sendMail(mailOptions);
    return { error: false };
  } catch (error) {
    // console.error("send-email-error", error);
    return {
      error: true,
      message: "Cannot send email",
    };
  }
}
module.exports = { sendEmail };