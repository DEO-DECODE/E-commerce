const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodeMailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: 'Ecom Support <support@ecom.com>',
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transporter.sendMail(mailOptions);

    console.log('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error.message);

    if (error.code === 'ECONNREFUSED') {
      console.error('Connection to SMTP server refused. Check SMTP server configuration.');
    }

    throw error; // Re-throw the error to handle it at a higher level if needed
  }
};

module.exports = sendEmail;
