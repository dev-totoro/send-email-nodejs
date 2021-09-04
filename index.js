require('dotenv').config()
const express = require('express');
const mailer = require('./utils/mail');
const fs = require('fs');

const app = express();

const port = process.env.PORT;

mailer.init();

app.get('/', (req, res) => {
  const receivedEmail = req.query.email;
  const title = "Confirm your account";
  const confirmLink = `http://localhost:${port}/confirm?email=${receivedEmail}`;

  fs.readFile('./templates/verify-account.html', (err, data) => {
    if (err) {
      res.status(503).send('Server error!');
      return;
    }
    const template = data.toString();
    const emailBody = template.replace(/{{email}}/g, receivedEmail)
      .replace(/{{confirm_link}}/g, confirmLink );

      mailer.sendMail(receivedEmail, title, emailBody);
      res.send(`An email was sent to ${receivedEmail}!`)
  });
});

app.get('/confirm', (req, res) => {
  const receivedEmail = req.query.email;
  res.send(`Your account "${receivedEmail}'' was confirmed!`)
});

app.listen(port, () => {
  console.log(`Send email app listening at http://localhost:${port}`)
})