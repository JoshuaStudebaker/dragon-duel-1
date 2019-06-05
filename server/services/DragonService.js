import mongoose from 'mongoose'

let _schema = new mongoose.Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    hp: { type: Number, required: true }
})


export default class DragonService {
    get repository() {
        return mongoose.model("dragon", _schema)
    }
}