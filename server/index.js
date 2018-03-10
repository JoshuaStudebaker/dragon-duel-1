var express = require("express");
var bp = require("body-parser");
var cors = require("cors");
var server = express();
var port = 3000;
var dragonRoutes = require('./dragon-routes')


var whitelist = ['http://localhost:8080'];
var corsOptions = {
	origin: function (origin, callback) {
		var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
		callback(null, originIsWhitelisted);
	},
	credentials: true
};

server.use(cors(corsOptions));
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));

server.use(dragonRoutes.router)

server.use("*", (err, req, res, next) => {
  res.status(400).send(err);
});

server.listen(port, () => {
  console.log("Server running on port: ", port);
});
