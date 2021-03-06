const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
const path = require("path");
const pug = require("pug");
const { htmlToText } = require("html-to-text");

// config credentials nodemailer
const _config = require("./config/config.js");

const configpath = path.join(__dirname, "..", "..", "..", "config.env");
dotenv.config({ path: configpath });

class ConfigEmail {
  constructor(userName, emailList, subject) {
    this.name = userName;
    this.emails = emailList;
    this.subject = subject;
  }

  createTransport() {
    let config = _config[process.env.NODE_ENV || "development"];
    return nodemailer.createTransport(config);
  }

  async send(emailType, options) {
    const transport = await this.createTransport();
    const emailPath = path.join(
      __dirname,
      "..",
      "../views/emails",
      `${emailType}.pug`
    );
    const html = pug.renderFile(emailPath, options);

    await transport.sendMail({
      from: "danielfcramos7@gmail.com",
      to: this.emails,
      subject: this.subject,
      html,
      text: htmlToText(html),
    });
  }
}

class SendEmail extends ConfigEmail {
  async SendWelcome({ email, userToken }) {
    const options = {
      name: this.name,
      email,
      validateEmail: `https://validateroute/${userToken}`,
    };
    await this.send("welcome", options);
  }
}

module.exports = { SendEmail };
