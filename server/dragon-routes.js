var router = require("express").Router();
const uuidv4 = require('uuid/v4')
var dragons = [
    {
        id: 0,
        name: 'Adult Black Dragon',
        imgUrl: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/13/1000/1000/636238871029832086.jpeg',
        maxHP: 195,
        currentHP: 195
    },
    {
        id: 1,
        name: 'Adult White Dragon',
        imgUrl: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/125/1000/1000/636252755468117001.jpeg',
        maxHP: 200,
        currentHP: 200
    },
    {
        id: 2,
        name: 'Adult Green Dragon',
        imgUrl: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/26/1000/1000/636238962276510242.jpeg',
        maxHP: 207,
        currentHP: 207
    },
    {
        id: 3,
        name: 'Adult Blue Dragon',
        imgUrl: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/16/1000/1000/636238882493439723.jpeg',
        maxHP: 225,
        currentHP: 225
    },
    {
        id: 4,
        name: 'Adult Red Dragon',
        imgUrl: 'https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/28/1000/1000/636238971817119794.jpeg',
        maxHP: 256,
        currentHP: 256
    }
]
var champions = [
    {
        id: 0,
        name: 'Briston',
        imgUrl: 'https://i.pinimg.com/736x/9e/9c/2a/9e9c2a98ddb7bbbd295f48071db9e830--fantasy-wizard-fantasy-male.jpg',
        race: 'Gnome',
        class: 'Wizard',
        hp: 122,
        attacks: {
            'Fire-Ball': '8d6',
            'Blight': '8d8',
            'Meteor-Swarm': '40d6'
        }
    },
    {
        id: 1,
        name: 'Nethtari',
        imgUrl: 'https://i.pinimg.com/originals/5c/23/4a/5c234aa91d5e94cf3fa163d869dd5ef8.jpg',
        race: 'Tiefling',
        class: 'Rogue',
        hp: 123,
        attacks: {
            'Short-Sword': '1d6',
            'Sneak-Attack': '10d6',
            'Assasinate': '20d6'
        }
    },
    {
        id: 2,
        name: 'Calvira',
        imgUrl: 'https://i.pinimg.com/originals/a5/9c/b8/a59cb8cbbd5f676b36ce28fb3b5e2980.jpg',
        race: 'Halfling',
        class: 'Druid',
        hp: 123,
        attacks: {
            'flamingSphere': '2d6',
            'callLightning': '3d10',
            'sunBurst': '12d6'
        }
    },
    {
        id: 3,
        name: 'Zylna',
        imgUrl: 'https://i.pinimg.com/474x/30/be/96/30be9640018354cbe9c90794ef280ea3--warcraft-art-world-of-warcraft.jpg',
        race: 'Elf',
        class: 'Cleric',
        hp: 130,
        attacks: {
            'mace': '1d6',
            'spiritGuardians': '3d8',
            'firestorm': '7d10'
        }
    },
    {
        id: 4,
        name: 'Mazar',
        imgUrl: 'https://d1u5p3l4wpay3k.cloudfront.net/wowpedia/thumb/3/32/Mazar2.jpg/300px-Mazar2.jpg?version=d48a94f6557f88dc86eaf319fc10f31c',
        race: 'Dwarf',
        class: 'Warlock',
        hp: 161,
        attacks: {
            'eldrichBlast': '1d10',
            'blight': '8d8',
            'fingerOfDeath': '7d12'
        }
    }
]
var games = {}
//region DRAGONS

//Get all dragons
router.get('/api/dragons', (req, res, next) => {
    res.status(200).send(dragons)
})
//Get dragons by Id
router.get('/api/dragons/:id', (req, res, next) => {
    var dragon = dragons[req.params.id]
    res.status(200).send(dragon)
})

//endregion

//region CHAMPOINS

//Get all champions
router.get('/api/champions', (req, res, next) => {
    res.status(200).send(champions)
})
//Get champions by Id
router.get('/api/champions/:id', (req, res, next) => {
    var champion = champions[req.params.id]
    res.status(200).send(champion)
})

//endregion

//region GAME

//New Game
router.post('/api/game', (req, res, next) => {
    let activeDragon = {}
    let activeChampion = {}
    if (dragons[req.body.dragonId] && champions[req.body.championId]) {
        var newGame = {
            _id: uuidv4(),
            _dragon: JSON.parse(JSON.stringify(dragons[req.body.dragonId])),
            _champion: champions[req.body.championId]
        }
        games[newGame._id] = newGame
        res.send({ status: 'Sucessfully Created Game', game: newGame })
    } else {
        res.status(400).send({ error: 'Please provide a valid dragonId and a championId' })
    }
})


//Get all games
router.get('/api/game', (req, res, next)=>{
    res.send(games)
})

//Get game by gameId
router.get('/api/game/:gameId', (req, res, next) => {
    console.log('Fetching Game')
    games[req.params.gameId] ? res.send(games[req.params.gameId]) : res.send({ error: 'Invalid GameId' })
})

//Attack
router.put('/api/game/:gameId', (req, res, next) => {
    let game = games[req.params.gameId]
    let attack = game._champion.attacks[req.body.attack] 
    if(game && attack){
        game._dragon.currentHP -= diceRoller(attack)
        if(game._dragon.currentHP<1){
            game._dragon.currentHP = 0
        }
        return res.send(game)
    }else{
        return res.status(400).send('Invalid Action')
    }
})


//End Game
router.delete('/api/game/:gameId', (req, res, next)=>{
    let game = games[req.params.gameId]
    if(game){
        delete games[req.params.gameId]
        res.status(200).send('Successfully Deleted Game')
    }
    else{
        res.status(400).send(`gameId ${req.params.gameId} was not found`)
    }
})

//endregion


//region HELPERS

function diceRoller(str) {
    str = str.toLowerCase().split('d')
    var count = str[0]
    var die = str[1]
    var total = 0
    for(var i = 0; i<count; i++){
        total+=Math.floor(Math.random() * Math.floor(die)+1)
    }
    return total
}
//endregion


module.exports = { router }