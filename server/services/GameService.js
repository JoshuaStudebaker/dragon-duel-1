import mongoose from 'mongoose'
const ObjectId = mongoose.Schema.Types.ObjectId


let _schema = new mongoose.Schema({
    dragon: { type: ObjectId, ref: 'dragon', required: true },
    champion: { type: ObjectId, ref: 'champion', required: true },
    dragonHp: { type: Number, required: true },
    championHp: { type: Number, required: true },
    gameOver: { type: Boolean, required: true, default: false },
    history: [{ type: String }]
})

function _diceRoller(str) {
    str = str.toLowerCase().split('d')
    var count = str[0]
    var die = str[1]
    var total = 0
    for (var i = 0; i < count; i++) {
        total += Math.floor(Math.random() * Math.floor(die) + 1)
    }
    return total
}


export default class GameService {
    async attack(game, request) {
        try {
            let attackDie = game.champion.attacks.find(a => a.name == request.attack)
            if (attackDie) {
                //Calculate Damage
                let playerDamage = _diceRoller(attackDie.damage)
                let dragonDamage = _diceRoller('3d10')
                //Apply Damage
                game.dragonHp -= playerDamage
                game.championHp -= dragonDamage
                //Update Game Status
                game.history.push(`${game.champion.name} used ${request.attack} doing ${playerDamage} damage. The ${game.dragon.name} did ${dragonDamage} in response`)
                if (game.dragonHp <= 0 || game.championHp <= 0) {
                    game.gameOver = true
                }
                let savedGame = await game.save()
                return savedGame
            }
            else throw new Error("invalid attack")
        }
        catch (err) {
            throw err
        }
    }
    get repository() {
        return mongoose.model("game", _schema)
    }
}