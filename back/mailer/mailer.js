const express = require('express');
const ejs = require('ejs');
const nodeMailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');

let render;
let template;

function mailer(type, props) {
  console.log('PROPS', props.content);
  switch (type) {
    case 'candidate':
      template = fs.readFileSync(path.join(__dirname, './template/mailExport.ejs'), ('utf-8'));
      render = ejs.render(template, props.content);
      break;
    default:
  }

  const transporter = nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'endava.intervu@gmail.com',
      pass: 'p0rt4rr3tr4t0'
    }
  });

  const mailOptions = {
    from: '"Interviews - Endava" <RRHH@endava.com>', // sender address (what the receiver sees)
    to: props.data.mail, // list of receivers
    subject: props.data.subject, // Subject line
    html: render
  };

  // Final Status Report
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = mailer;
