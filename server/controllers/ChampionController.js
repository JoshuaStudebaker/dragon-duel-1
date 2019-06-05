import express from 'express'
import ChampionService from "../services/ChampionService";

let _repo = new ChampionService().repository

export default class ChampionController {
    constructor() {
        this.router = express.Router()
            .get("", this.getAll)
            .get("/:id", this.GetById)
            .use('*', this.defaultRoute)
    }

    defaultRoute(req, res, next) {
        next({ status: 404, message: 'Route Not Found' })
    }

    async getAll(req, res, next) {
        try {
            let data = await _repo.find({})
            return res.send(data)
        } catch (err) { next(err) }
    }

    async GetById(req, res, next) {
        try {
            let data = await _repo.findById(req.params.id)
            res.send(data)
        } catch (err) { next(err) }
    }
}