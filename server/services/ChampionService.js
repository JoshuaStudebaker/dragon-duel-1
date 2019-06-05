import mongoose from 'mongoose'

let _attack = new mongoose.Schema({
    name: { type: String, required: true },
    damage: { type: String, required: true }
})

let _schema = new mongoose.Schema({
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },
    race: { type: String, required: true },
    class: { type: String, required: true },
    hp: { type: Number, required: true },
    attacks: [_attack]
})


export default class ChampionService {
    get repository() {
        return mongoose.model("champion", _schema)
    }
}

