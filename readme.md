#  Dragon-Duel-API Documentation

  

##  Dragon Routes

**GET**: https://dragon-duel.herokuapp.com/api/dragons 

 - Returns all Dragons

**GET**: https://dragon-duel.herokuapp.com/api/dragons/:id

 - Returns a Dragon at specific id

##  Champion Routes

**GET**: https://dragon-duel.herokuapp.com/api/champions

 - Returns all Champions

**GET**: https://dragon-duel.herokuapp.com/api/champions/:id

 - Returns a Champion at specific id

##  Game Routes

**GET**:  https://dragon-duel.herokuapp.com/api/games

 - Returns all Games

**GET**: https://dragon-duel.herokuapp.com/api/games/:gameId

 - Returns Games at specific id
 
**POST**:  https://dragon-duel.herokuapp.com/api/games

 - *BODY*: 
 	```javascript
 		{ 
		  dragon: string //some dragon _id, 
		  champion: string //some champion _id
		}
 - Creates New Game and returns full game object
 
 **PUT**:  https://dragon-duel.herokuapp.com/api/games/:id

 - *BODY*: 
	 ```javascript
	 { 
	 	attack: string //attack name from champion attack options 
	 }
	 ```
 - Attacks Dragon with specified attack and returns updated Game object
		 - Note: both the player and the dragon will take damage
	
**DELETE**:  https://dragon-duel.herokuapp.com/api/games/:id

 - Removes the game at the specified id

## Game Object

 The game object you recieve from your get by id will look something like this (obviously values for champion and dragon change based on selection):
 ```javascript
  {
    "gameOver": false, //Status of the game
    "history": [
      //String of attack history as the game is played
    ],
    "_id": "5cf7f0bfa0678614a4e2dae8",
    "dragon": {
	    "_id": "5cf7ddd04eaeb52074787892",
	    "name": "Adult Black Dragon",
	    "imgUrl": "https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/13/1000/1000/636238871029832086.jpeg",
	    "hp": 195, // this is the max hp for this dragon
	    "__v": 0
	    },
    "champion": {
	    "_id": "5cf7d96e09bdf33014831e33",
	    "name": "Zylna",
	    "imgUrl": "https://i.pinimg.com/474x/30/be/96/30be9640018354cbe9c90794ef280ea3--warcraft-art-world-of-warcraft.jpg",
	    "race": "Elf",
	    "class": "Cleric",
	    "hp": 130, //this is the max hp for this champion
	    "attacks": [
	      {
		"_id": "5cf7d96e09bdf33014831e36",
		"name": "mace",
		"damage": "1d6"
	      },
	      {
		"_id": "5cf7d96e09bdf33014831e35",
		"name": "spiritGuardians",
		"damage": "3d8"
	      },
	      {
		"_id": "5cf7d96e09bdf33014831e34",
		"name": "firestorm",
		"damage": "7d10"
	      }
	    ]
	   }
    "dragonHp": 195, //hp for this games dragon
    "championHp": 130, //hp for this games champion
    "__v": 0
  }
 ```
