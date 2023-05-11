const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());

app.use(cors({origin: '*'}));

const contactRoute = require('./routes/contact.routes');
app.use('/v1/contacts', contactRoute);

module.exports = app;
