const express=require("express");

const app=express();

const socketio=require("socket.io");

const http=require("http");

const server=http.createServer(app);

const io=socketio(server);



io.on("connection",(socket)=>{

socket.on("turn",(data)=>{
    
    io.emit("turnPut",data);
})

socket.on("wonPlayer",(data)=>{
   io.emit("displayPlayer",data);
})

socket.on("restart",()=>{
    io.emit("restartfun");
})
socket.on("draw",()=>{
    io.emit("drawdisplay")
})


})

app.use("/",express.static(__dirname+"/public"))
server.listen("3242",()=>{
    console.log("server is listen on port 3242");
})