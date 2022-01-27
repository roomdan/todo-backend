const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

class Email {
  constructor(name, emails) {
    this.name = name;
    this.emails = emails;
  }

  createTransport() {
    return nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: "2525",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
  }

  async send(subject) {
    const transport = await this.createTransport();

    transport.sendMail({
      from: "danielfcramos7@gmail.com",
      subject,
      html: "",
    });
  }

  sendWelcome() {}
}
