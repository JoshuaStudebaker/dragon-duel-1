import express from "express"

let _repo;


export default class BaseController {
    constructor(ServiceRef) {
        _repo = new ServiceRef().repository
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

    async create(req, res, next) {
        try {
            let data = await _repo.create(req.body)
            return res.status(201).send(data)
        } catch (err) { next(err) }
    }
    async edit(req, res, next) {
        try {
            let data = await _repo.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            if (data) {
                return res.send(data)
            }
            throw new Error("invalid id")
        } catch (err) { next(err) }
    }
    async delete(req, res, next) {
        try {
            let data = await _repo.findByIdAndRemove(req.params.id)
            return res.send("Successfully deleted")
        } catch (err) { next(err) }
    }


}