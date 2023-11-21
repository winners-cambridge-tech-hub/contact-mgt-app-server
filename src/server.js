const http = require('http');
const app = require('./app');
const port = process.env.PORT || 3000;
//const cronScheduler = require('./scheduler/sendMail')

const server = http.createServer(app);
server.listen(port);
console.log('Server listening on port ' + port);


