require("dotenv").config(); 
const express = require('express');
const http = require("http");
const { dirname } = require("path");
const socketio = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketio(server);

app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.send("LIVE TRACK.");
});

server.listen(PORT,(req,res)=>{
    console.log(`Running on the port ${PORT}`);
})