const express = require("express");
const app = express();
var http = require('http');
require('dotenv').config();

var server = http.createServer(app);

server.listen(process.env.PORT,()=>{
    console.log('server is online')
});

app.get('/',(req,res)=>{
  res.send('SmartIT Web Server');
});

//////////////////Web socket/////////////////////////

const io = require('socket.io')(server);

io.on("connect",(socket)=>{
    console.log("connected")
    socket.emit("AUTH","");
    socket.on("JOINROOM",(room)=>{
      if(room !== null && room !== undefined ){
        socket.join(room?.device_id?.toString());
      }
    });
    
    socket.on("ONCHANGE",(data)=>{
      console.log(data)
      socket.to(data.device_id?.toString()).emit( "AAAAAA", { switchNo:data.switchNo, switchStatus:!data.switchStatus } );
    });

});

//////////////////Web socket/////////////////////////