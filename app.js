require("dotenv").config(); 
const express = require('express');
const http = require("http");
const path = require("path");
const socketio = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));


io.on("connection", function (socket) {
    console.log("Connection established Successfully");

    socket.on("send-location", function (data) {
        console.log(`Received from client: Latitude ${data.latitude}, Longitude ${data.longitude}`);
        io.emit("receive-location", { id: socket.id, ...data });
    });
});


app.get("/",(req,res)=>{
    res.render("index");
});

server.listen(PORT,(req,res)=>{
    console.log(`Running on the port ${PORT}`);
})