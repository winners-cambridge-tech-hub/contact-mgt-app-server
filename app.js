const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.get('/', (req, res) => {
  console.log('hello world');
});

const contactRoute = require('./routes/contact.routes');
app.use('/v1/contacts', contactRoute);

module.exports = app;
