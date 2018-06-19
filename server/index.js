var express = require("express");
var bp = require("body-parser");
var cors = require("cors");
var server = express();
var port = process.env.PORT  || 3000;
var dragonRoutes = require('./dragon-routes')




server.use(cors());
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));


server.use(dragonRoutes.router)

server.use("*", (err, req, res, next) => {
  res.status(400).send(err);
});

server.listen(port, () => {
  console.log("Server running on port: ", port);
});
