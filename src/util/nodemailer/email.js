const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");

const configpath = path.join(__dirname, "..", "..", "..", "config.env");

console.table({ route: configpath });

dotenv.config({ path: configpath });

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
        user: String("83e1578ddbde7f"),
        pass: String("3ba42c00944bea"),
      },
    });
  }

  async send(subject) {
    const transport = await this.createTransport();

    await transport.sendMail({
      from: "danielfcramos7@gmail.com",
      to: "danielexampexe@gmail.com",
      subject,
      html: "hola mundo",
    });
  }

  async sendWelcome() {
    await this.send("new email");
  }
}

module.exports = { Email };
