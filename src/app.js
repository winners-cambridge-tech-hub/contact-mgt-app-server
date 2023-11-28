const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactRoute = require('./routes/contact.routes');
const categoryRoute = require('./routes/category.routes');
const tutorialRoute = require('./routes/tutorial.routes');

global.__basedir = __dirname + "/..";

const app = express();

// Apply bodyParser middleware for non-GET requests
app.use((req, res, next) => {
    if (req.method !== 'GET') {
      bodyParser.json()(req, res, next);
    } else {
      next();
    }
  });

app.use(cors({origin: '*'}));


app.use('/v1/contacts', contactRoute);
app.use('/v1/tutorials', tutorialRoute);
app.use("/v1/category",categoryRoute )

module.exports = app;
