const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const route = express.Router();
const port = process.env.PORT || 5000;

app.use('/v1', route);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.gmail.com',
  auth: {
    user: 'emjarvisnotifications@gmail.com',
    pass: 'zhyo tnxf kzpd sokg',
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

route.post('/text-mail', (req, res) => {
  const { name, phone, email, message } = req.body;
  // const { to, subject, text } = req.body;
  const mailData = {
    from: 'emjarvisnotifications@gmail.com',
    to: 'emilylouisejarvis@gmail.com',
    subject: 'emjarvis Notification',
    // text: text,
    html: `
    <b> ${name} </b> <br>
    <b>Phone: </b> ${phone} <br>
    <b>Email: </b> ${email} <br> <br>
    <b>Message: </b> <br>${message}
    `,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    res.status(200).send({ message: 'Mail send', message_id: info.messageId });
  });
});
