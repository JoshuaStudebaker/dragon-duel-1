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

