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
		  dragonId: string //some dragon id, 
		  championId: string //some championId
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

 The game object you recieve will look something like this:
 ```json
 {
	"_id": "a11f6c4c-a61c-46e1-bb0e-c6a51a6d4af2",
	"_dragon": {
		"id": 1,
		"name": "Adult White Dragon",
		"imgUrl": "https://media-waterdeep.cursecdn.com/avatars/thumbnails/0/125/1000/1000/636252755468117001.jpeg",
		"maxHP": 200,
		"currentHP": 200
	},
	"_champion": {
		"id": 1,
		"name": "Nethtari",
		"imgUrl": "https://i.pinimg.com/originals/5c/23/4a/5c234aa91d5e94cf3fa163d869dd5ef8.jpg",
		"race": "Tiefling",
		"class": "Rogue",
		"hp": 123,
		"attacks": {
			"Short-Sword": "1d6",
			"Sneak-Attack": "10d6",
			"Assasinate": "20d6"
		}
	},
	"history": []
}
 ```
