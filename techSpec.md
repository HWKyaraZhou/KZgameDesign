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
1. Game Manager Class
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

2. Player Class
    - Variables:
        - *inventory: Item[]* - inits the inventory
        - *position: Position* - x and y coordinates for position on the map
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
            - 'target' is an NPC/InteractiveObject
            - if the target accepts an item in the inventory, remove the item from the inventory
            - if giving the item triggers dialogue or a new scene, initialize the dialogue/scene
        - *interact(object)*
            - the object is an InteractiveObject, which encompesses NPCs
            - provokes different actions when called- depending on the type of object

3. Item Class
    - Variables:
        - *name: String* - name of the specific item
        - *icon: String* - link to an image that represents the item
        - *usable: boolean* - is the item usable?
    - Methods:
        - *constructor(name, icon, usable = true)*
            - inits new item with a name, icon, and usability
        - *useItem(target)* 
            - applies item to InteractiveObject based on the item and object type
    - <span style="color:purple">This overall class is not specific enough. More design information on what items are in the game, how they are obtained, and how they are used is necessary to complete this class.</span>

4. InteractiveObject Class
    - Variables:
        - *name: String* - name of the specific object or NPC
        - *dialogueList: DoublyLinkedList* - list of the potential dialogue of a NPC
        - *position: Position* - position on the map
        - *appearance: String* - link to an image that represents the object
        - *state: String* - current state of the object (if components of the object change when interacted with)
    - Methods:
        - *constructor(name, dialogueTree, position, appearance)*
            - inits new object with a name, list of potential dialogue (empty if the object is not an NPC), position, appearance, and state
        - *talk (player)*
            - starts the conversation by running down the dialogueList
            - user's choices prompt different dialogues
            - only run if the object has a dialogueList
        - *interact (player)*
            - <span style="color:purple">More design information is needed on what interactions are in the game, how they differ between objects, and how they impact the user.</span>
        - *updateState()*
            - updates the state of the object if necessary
            - <span style="color:purple">More design information is needed on how/if states should change.</span>

5. Monster Class
    - Variables:
        - *position: Position* - position of the monster
    - Methods:
        - *spawn()*
            - spawns the monster at a random position
        - *killPlayer()*
            - ends the game
    - <span style="color:purple">There is currently little in the design that explains the monster. Information on if the monster moves (and how it moves), if it has different states, and how it kills the player is needed.</span>
6. Scene Class
    - Variables:
        - *name: String* - name of the scene
        - *background: String* - links to an image of the background
        - *objArr: InteractiveObject[]* - array of InteractiveObjects in the scene
        - *itemArr: Item[]* - array of items in the scene
        - *navigationArrows: Scene[]* array of left, right, up, down scenes
    - Methods:
        - *constructor (name, background, objArr, navigationArrows)*
            - ints scene
        - *render()
            - renders the scene
        - *handleInput(input)*
            - handles clicks in scene
        - *update(deltaTime)*
            - updates objects in the scene
7. TimeManager Class
    - Variables:
        - *remainingTime: int* - time left
        - *isRunning: boolean* - is the clock running
        - *timeEvents: int, String (name of event)[]* - map of events that happen at certain times
    - Methods:
        - *startTimer()*
            - starts the timer
        - *resumeTimer()*
            - resumes the timer
        - *pauseTimer()*
            - pauses the timer    
        - *updateTime(deltaTime)*
            - changes the time 
        - *triggerTimeEvents(deltaTime)*
            - triggers events based on times
            - <span style="color:purple">The design of these events is unclear- what are they, when do they happen, etc.</span>
8. EventManager Class
    - Variables:
        - *events: static Map(String, function)* - map of events and the functions they perform
    - Methods:
        - *triggerEvent(eventName)*
            - Trigger a registered event- does whatever function is entailed
        - *update(deltaTime)*
            - Update event states if necessary
        - <span style="color:purple">The design of these events is unclear- what are they, when do they happen, etc.</span>
9. Position Class
    - Variables:
        - *isAccessible: boolean* - is the location accessible
        - *xcord: int* - x-coordinate of location
        - *ycord: int* - y-coordinate of location
    - Methods:
        - *constructor (isAccessible, xcord, ycord)*
            - inits position
10. InputManager Class
    - Variables:
        - *currentInput: Object* - input by the user
    - Methods:
        - *init()*
            - adds event listeners
        - *mouseClick()*
            - handles click events