// "start": "NODE_ENV=production nodemon index.js"
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

    socket.emit("AUTH","");

    socket.on("JOINROOM",(room)=>{
      if(room !== null && room !== undefined ){
        console.log(room)
        if(typeof room == "object" && room?.gId !== null && room?.gId !== undefined){
          socket.join(room?.gId?.toString());
        }
        else if(typeof room == "string"){
          socket.join(room?.toString());
        }
      }
    });

    socket.on("GET_STATUS", (data)=>{
      if(data?.Room_Name!==undefined && data?.Device_Name!==undefined){
          socket.to(data?.Room_Name?.toString()).emit( data?.Device_Name+"_STATUS", "" );
      }
    })
    
    socket.on("STATUS", (data)=>{
      if(data!==undefined){
        if(data?.Room_Name!==undefined && data?.Device_Name!==undefined){
            socket.to(data?.Room_Name?.toString()).emit("DEVICE_APP", data);
        }
      }
    })

    socket.on("ONCHANGE",({ roomName, deviceName, switchNo, switchStatus })=>{
      socket.to(roomName?.toString()).emit( deviceName, { switchNo, switchStatus:!switchStatus } );
    });

});

//////////////////Web socket/////////////////////////