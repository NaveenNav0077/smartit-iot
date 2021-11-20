// "start": "NODE_ENV=production nodemon index.js"
const express = require("express");
const app = express();
var http = require('http');
var port = 5000;
app.set('port', port);
app.get('/',(req,res)=>{
    res.send('SmartIT Web Server');
});
var server = http.createServer(app);
server.listen(port,()=>{
    console.log('server lisining on port '+port)
});
