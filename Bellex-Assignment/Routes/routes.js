const express = require('express')
const routes =  express.Router();

routes.get("/", (req, res) => {
  res.send("Hello World!");
});

routes.post("/", (req, res) => {
  res.send("Got a POST request");
});

routes.put("/user", (req, res) => {
  res.send("Got a PUT request at /user");
});

routes.delete("/user", (req, res) => {
  res.send("Got a DELETE request at /user");
});


module.exports = routes
