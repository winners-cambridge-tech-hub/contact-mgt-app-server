const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoute = require('./routes/contact.routes');
const tutorialRoute = require('./routes/tutorial.routes');

global.__basedir = __dirname + "/..";

const app = express();
app.use(bodyParser.json());
app.use(cors({origin: '*'}));
app.use('/v1/contacts', contactRoute);
app.use('/v1/tutorials', tutorialRoute);

module.exports = app;
