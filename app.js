const express = require('express')
const app = express();


const postRoute = require('./routes/posts.routes')

app.use("/posts", postRoute);

module.exports = app