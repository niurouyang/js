const http = require('http');
// this is same as import module in python
const app = require('./app');

const port = process.env.port || 3000 ;

const server = http.createServer(app);

server.listen(port);


