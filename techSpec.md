# Technical Specifications
## Tech Stack
- Options for engines to run the game:
    - 
    - Bladecoder (https://bladecoder.github.io/bladecoder-adventure-engine/)
        - Pros:
            - This engine is specifically made for point-and-click adventure games (which this game is)
            - Includes every feature needed for this game- rendering, movement, animations, etc.
        - Cons:
            - Does not offer JavaScript integration, instead uses LibGDX and java
    - JSGAM (https://kreezii.github.io/jsgam/)
        - Pros:
            - Made for point-and-click adventure games
            - Based in JavaScript and HTML
            - Simple to use
        - Cons: 
            - Does not allow complex games due to its simplicity
            - Requires the use of an app
    - GDevelop (https://gdevelop.io/)
        - Pros:
            - Provides JavaScript integration
        - Cons:
            - Allows higher complexity that is unessecary for this game
- Best Option 
    - 
    - JSGAM due to its ease of use, js integration, and relevance to the point-and-click genre

## Architecture
1. Game Manager
    - Variables: 
        - *currentScene: Scene* - instance of the current scene
        - *gameTimer: TimeManager* - instance of the game timer
        - *difficulty: int* - measure of games difficulty, affecting the timer
        - *gameState: String* - either 'menu', 'playing', or 'game over'
    - Methods:
        - *initGame()* 
            - initializes the game- setting up scenes, the inventory, and the timer
        - *changeScene()* 
            - handles scene transition, including rendering of objects and images
        - *startGame()* 
            - changes the gameState to 'playing', starts the gameTimer, and allows the user to begin playing
        - *gameOver()* 
            - changes the gameState to 'game over'
2. Player
    - Variables:
        - *inventory: Item[]* - inits the inventory
        - *position: int, int* - x and y coordinates for position on the map
        - *isAlive: boolean* - set to true initially
        - *viewDirection: String* - can be 'left', 'right', 'up', 'down', or null
        - more
    - Methods:
        - *changeView(direction)*
            - changes the viewDirection variable to what is indicated
            - called due to an action by the user (clicking a direction)
            - the new view inits a new scene
        - *move(direction)*
            - moves the character forward or backward, initializing a new scene
            - this method is called when the user clicks the forward or backword icon to move
        - *addItem(item)*
            - adds an item to the inventory array, called when a user clicks that item
        - *useItem(target)*
            - 'target' is an NPC or InteractiveObject
            - if the target accepts an item in the inventory, remove the item from the inventory
            - if giving the item triggers dialogue or a new scene, initialize the dialogue/scene
        - *

2. Item Class
    - 
    - Variables:
        - *name: String* - name of the specific item
    - Methods:
        - *addItem:* - adds item to inventory
        - *useItem:* - applies item to interactive NPC/object
    - <span style="color:purple">This is not specific enough. More design information on what items there are, how they are obtained, and how they are used is necessary to complete this class.</span>
2. 
    