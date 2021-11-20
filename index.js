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

//////////////////Web socket/////////////////////////

const io = require('socket.io')(server);

io.on("connect",(socket)=>{
    console.log('New user connected');

    socket.emit("auth","Check Is Device Is Online");

    socket.on("status", (data)=>{
      console.log(data);
    })

    socket.on("JoinRoom",(room)=>{
      console.log(room);
      socket.join(room)
    });

    socket.on("message",({ roomName, deviceName, switchNo, switchStatus })=>{
      console.log({ roomName, deviceName, switchNo, switchStatus })
      let data = 0;
      switch(switchNo){
        case 1:
          switchStatus === true ? data = 1 : data = 2;
          break;
        case 2:
          switchStatus === true ? data = 3 : data = 4;
          break;
        case 3:
          switchStatus === true ? data = 5 : data = 6;
          break;
        case 4:
          switchStatus === true ? data = 7 : data = 8;
          break;
        default: 
          data=0;
      }
      console.log(data);
      socket.to(roomName).emit( deviceName, data );
    });

});

//////////////////Web socket/////////////////////////