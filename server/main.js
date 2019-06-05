import express from 'express'
import "./db/dbconfig"
import cors from 'cors'

let server = express()
let bp = require('body-parser')
let port = process.env.PORT || 3000;

var whitelist = ['http://localhost:8081', 'https://dragon-duel.herokuapp.com/', 'http://localhost:8080'];
var corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
        callback(null, originIsWhitelisted);
    },
    credentials: true
};
server.use(cors(corsOptions));

server.use(bp.urlencoded({ extended: true }))
server.use(bp.json())






import ChampionController from "./controllers/ChampionController";
import DragonController from "./controllers/DragonController";
import GameController from "./controllers/GameController"


server.use("/api/champions", new ChampionController().router)
server.use("/api/dragons", new DragonController().router)
server.use("/api/games", new GameController().router)



//Default Error Handler
server.use((error, req, res, next) => {
    res.status(error.status || 400).send({ error: { message: error.message } })
})

server
    .listen(port, () => console.log(`listening on ${port}`))
