import express from "express"
import GameService from "../services/GameService";
import DragonService from "../services/DragonService";
import ChampionService from "../services/ChampionService";

let _service = new GameService()
let _gameRepo = _service.repository
let _dragonRepo = new DragonService().repository
let _championRepo = new ChampionService().repository

export default class GameController {
    constructor() {
        this.router = express.Router()
            .get("", this.getAll)
            .get("/:id", this.GetById)
            .post("", this.create)
            .put("/:id", this.edit)
            .delete("/:id", this.delete)
            .use('*', this.defaultRoute)
    }

    defaultRoute(req, res, next) {
        next({ status: 404, message: 'Not Found' })
    }

    async getAll(req, res, next) {
        try {
            let data = await _gameRepo.find({})
            return res.send(data)
        } catch (err) { next(err) }
    }

    async GetById(req, res, next) {
        try {
            let data = await _gameRepo.findById(req.params.id).populate('dragon').populate('champion')
            res.send(data)
        } catch (err) { next(err) }
    }

    async create(req, res, next) {
        try {
            let [dragon, champion] = await Promise.all([_dragonRepo.findById(req.body.dragon), _championRepo.findById(req.body.champion)]);
            req.body.dragonHp = dragon.hp
            req.body.championHp = champion.hp
            let data = await _gameRepo.create(req.body)
            return res.status(201).send(data)
        } catch (err) { next(err) }
    }
    async edit(req, res, next) {
        try {
            let game = await _gameRepo.findById(req.params.id).populate('dragon').populate('champion')
            if (game.gameOver === false) {
                let result = await _service.attack(game, req.body)
                return res.send(result)
            }
            throw new Error("invalid id or Game Over")
        } catch (err) { next(err) }
    }
    async delete(req, res, next) {
        try {
            let data = await _gameRepo.findByIdAndRemove(req.params.id)
            return res.send("Successfully deleted")
        } catch (err) { next(err) }
    }


}