const express = require("express");
const morgan = require("morgan");
const { v4: uuidv4 } = require("uuid");

const app = express();

const user = [];

app.use(express.json()); //this middleware - it simply add the data from the body to the req

//public  folder
app.use(express.static(`${__dirname}/public`));

// Set ejs template
app.set("view engine", "ejs");

// Initial routes

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home page",
  });
});

app.post("/join", (req, res) => {
  if (!req.body.token) {
    const userId = uuidv4();
    console.log("Created new user with id: ", userId);
    user.push(userId);
    res.json(userId);
  } else {
    console.log("User already exists");
    res.json(null);
  }
});

app.get("/poll", (req, res) => {
  res.render("poll", {
    title: "Poll",
  });
});

//start server
module.exports = { app, user };
