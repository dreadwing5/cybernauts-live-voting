const dotenv = require("dotenv");
const http = require("http");
const WebSocket = require("ws");
const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { app } = require("./app");
const { user } = require("./app");

const response = Array(4).fill(0);

dotenv.config({
  path: "./config.env",
});

const port = process.env.PORT || 3000;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", function connection(ws, request) {
  ws.send("Welcome New Client!");
  ws.on("message", function message(message) {
    const resIndex = JSON.parse(message);
    response[resIndex] += 1; //Increase the count

    console.log(response);
  });
});

server.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
