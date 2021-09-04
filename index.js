require('dotenv').config()
const express = require('express');
const mailer = require('./utils/mail');

const app = express();

const port = process.env.PORT;

mailer.init();

app.get('/', (req, res) => {
  const receivedEmail = req.query.email;
  const title = "Test title";
  const body = "Test content";
  mailer.sendMail(receivedEmail,title,body);
  res.send(`An email was sent to ${receivedEmail}!`)
})

app.listen(port, () => {
  console.log(`Send email app listening at http://localhost:${port}`)
})