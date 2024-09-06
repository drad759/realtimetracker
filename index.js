const express = require('express');
const app = express();
const http = require("http");
const path = require('path');

const server = http.createServer(app);
const socket = require("socket.io");
const port = 3333;

const io = socket(server);


app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
    console.log(" connected");

    socket.on("send-location", (data) => {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    socket.on("disconnect", () => {
        console.log("A client disconnected");
        io.emit("user-disconnected", socket.id);
    });

    
});

app.get("/", (req, res) => {
    res.render("index");
});

server.listen(port);