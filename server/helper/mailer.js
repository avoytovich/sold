const nodemailer = require('nodemailer');
const config = require('./../../config/mailer.config.json');

let mailer =  nodemailer.createTransport(config);

module.exports = {
  send(mailOptions) {
    return mailer.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log('Message sent:', info.messageId);
    });
  }
};
