// Game Configuration
const config = {
  width: 800,
  height: 600
};

// Create Pixi Application
const app = new PIXI.Application(config);
document.getElementById('gameCanvas').appendChild(app.view);

// Get UI Elements
const popupElement = document.getElementById('popup');
const popupContent = document.getElementById('popup-content');
const popupClose = document.getElementById('popup-close');
const mapButton = document.getElementById('map-button');
const dialogChoices = document.getElementById('dialog-choices');
const inventorySlots = document.querySelectorAll('.inventory-slot');
const timerElement = document.getElementById('timer');
const gameOverElement = document.getElementById('game-over');
const resetButton = document.getElementById('reset-button');

// Game state management
const gameState = {
  coinCollected: false,
  timeLeft: 180,
  inventory: [null, null, null],
  ruinsUnlocked: false
};

const pauseButton = document.getElementById('pause-button');
const pauseOverlay = document.getElementById('pause-overlay');
let isPaused = false;

// Timer Management
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  updateTimerDisplay();

  timerInterval = setInterval(() => {
      if (!isPaused) {
          gameState.timeLeft--;
          updateTimerDisplay();

          if (gameState.timeLeft <= 0) {
              gameOver();
          }
      }
  }, 1000);
}

function updateTimerDisplay() {
  const minutes = Math.floor(gameState.timeLeft / 60);
  const seconds = gameState.timeLeft % 60;
  const display = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  timerElement.textContent = display;

  if (gameState.timeLeft <= 30) {
    timerElement.style.color = 'red';
  } else {
    timerElement.style.color = 'black';
  }
}

function togglePause() {
  isPaused = !isPaused;
  pauseOverlay.style.display = isPaused ? 'flex' : 'none';
  
  if (isPaused) {
      clearInterval(timerInterval);
      app.stage.interactive = false;
      app.stage.interactiveChildren = false;
  } else {
      if (gameState.timeLeft > 0) {
          startTimer();
      }
      app.stage.interactive = true;
      app.stage.interactiveChildren = true;
  }
}

function gameOver() {
  clearInterval(timerInterval);
  gameOverElement.style.display = 'block';
  app.stage.interactive = false;
}

function resetGame() {
  clearInterval(timerInterval);
  gameOverElement.style.display = 'none';
  app.stage.interactive = true;
  app.stage.interactiveChildren = true;
  gameState.inventory = [null, null, null];
  gameState.coinCollected = false;
  gameState.ruinsUnlocked = false;
  isPaused = false;
  pauseOverlay.style.display = 'none';
  updateInventoryDisplay();
  currentScene = 'small-house';
  renderScene(currentScene);
  startTimer();
}

// Inventory Management
function addToInventory(item) {
  const emptySlot = gameState.inventory.indexOf(null);
  if (emptySlot !== -1) {
    gameState.inventory[emptySlot] = item;
    updateInventoryDisplay();
    return true;
  }
  return false;
}

function removeFromInventory(item) {
  const index = gameState.inventory.indexOf(item);
  if (index !== -1) {
    gameState.inventory[index] = null;
    updateInventoryDisplay();
    return true;
  }
  return false;
}

function updateInventoryDisplay() {
  inventorySlots.forEach((slot, index) => {
    slot.textContent = gameState.inventory[index] || '';
  });
}

// Popup Management
function showPopup(message, choices = []) {
  popupContent.textContent = message;

  dialogChoices.innerHTML = '';

  choices.forEach(choice => {
    const button = document.createElement('button');
    button.textContent = choice.text;
    button.onclick = choice.action;
    dialogChoices.appendChild(button);
  });

  popupElement.style.display = 'block';
}

function hidePopup() {
  popupElement.style.display = 'none';
  dialogChoices.innerHTML = '';
}

// Scene Definitions
const scenes = {
  'small-house': {
    backgroundColor: 0xFDF5E6,
    circles: [
      {
        x: 400,
        y: 450,
        radius: 100,
        color: 0x0000FF,
        description: 'A creaky rocking chair facing the window, casting long shadows.',
        specialInteraction: {
          type: 'floor',
          action: () => {
            if (!gameState.coinCollected) {
              showPopup('You found a coin!', [
                {
                  text: 'Pick up',
                  action: () => {
                    if (addToInventory('Coin')) {
                      gameState.coinCollected = true;
                      hidePopup();
                    } else {
                      showPopup('Inventory is full!');
                    }
                  }
                }
              ]);
            } else {
              showPopup('You search the area again but find nothing new.');
            }
          }
        }
      },
      {
        x: 250,
        y: 200,
        radius: 100,
        color: 0xFF0000,
        description: 'A worn wooden shelf with dusty trinkets and faded photographs.'
      },
      {
        x: 550,
        y: 300,
        radius: 100,
        color: 0x00FF00,
        description: 'An old fireplace with cold ashes and a single rusted poker.'
      },
      {
        x: 150,
        y: 350,
        radius: 100,
        color: 0x800080,
        description: 'A locked table with an intricate mechanism.',
        specialInteraction: {
          type: 'table',
          description: 'The table is locked and requires something to open it.',
          action: () => {
            const hasMetalClip = gameState.inventory.includes('Metal Clip');
            const choices = [];

            if (hasMetalClip) {
              choices.push({
                text: 'Use Metal Clip',
                action: () => {
                  removeFromInventory('Metal Clip');
                  if (addToInventory('Key')) {
                    showPopup('You used the metal clip to unlock the table. You found a key!');
                  }
                }
              });
            }

            choices.push({
              text: 'Leave',
              action: hidePopup
            });

            showPopup('The table is locked.', choices);
          }
        }
      }

    ]
  },
  'village': {
    backgroundColor: 0xB0E0E6, // Powder Blue
    circles: [
      {
        x: 250,
        y: 200,
        radius: 100,
        color: 0xFF0000,
        description: 'A bustling market stall with colorful fruits and vegetables.'
      },
      {
        x: 550,
        y: 300,
        radius: 100,
        color: 0x00FF00,
        description: 'Villagers chatting by the community water fountain.'
      },
      {
        x: 150,
        y: 400,
        radius: 100,
        color: 0x800080,
        description: 'You notice an unusual pattern in the wall...',
        specialInteraction: {
          type: 'door',
          action: () => {
            const hasKey = gameState.inventory.includes('Key');
            const choices = [];

            if (hasKey && !gameState.ruinsUnlocked) {
              choices.push({
                text: 'Use Key',
                action: () => {
                  removeFromInventory('Key');
                  gameState.ruinsUnlocked = true;
                  showPopup("You've unlocked 'The Hidden Ruins'!", [
                    {
                      text: 'Ok',
                      action: hidePopup
                    }
                  ]);
                }
              });
            }

            choices.push({
              text: 'Leave',
              action: hidePopup
            });

            showPopup(hasKey ? 'There appears to be a keyhole...' : 'You notice a locked door.', choices);
          }
        }
      },
      {
        x: 400,
        y: 450,
        radius: 100,
        color: 0x0000FF,
        description: 'A villager standing near an old stone well.',
        specialInteraction: {
          type: 'villager',
          description: 'A villager looks at you expectantly.',
          action: () => {
            const hasCoin = gameState.inventory.includes('Coin');
            const choices = [];

            if (hasCoin) {
              choices.push({
                text: 'Give Coin',
                action: () => {
                  removeFromInventory('Coin');
                  if (addToInventory('Metal Clip')) {
                    showPopup('The villager gives you a metal clip in exchange for the coin.');
                  }
                }
              });
            }

            choices.push({
              text: 'Leave',
              action: hidePopup
            });

            showPopup('The villager seems interested in a coin.', choices);
          }
        }
      }
    ]
  },
  'ruins': {
    backgroundColor: 0x4A4A4A, // Dark gray
    circles: [
      {
        x: 400,
        y: 300,
        radius: 100,
        color: 0xFFFFFF,
        description: 'An ancient archway leads to what appears to be an exit.',
        specialInteraction: {
          type: 'exit',
          action: () => {
            showPopup('Do you want to leave the ruins?', [
              {
                text: 'Yes',
                action: () => {
                  clearInterval(timerInterval);
                  showPopup('You escaped! Congratulations!', [
                    {
                      text: 'Play Again',
                      action: resetGame
                    }
                  ]);
                }
              },
              {
                text: 'No',
                action: hidePopup
              }
            ]);
          }
        }
      }
    ]
  },
  'map': {
    backgroundColor: 0xD2B48C, // Tan
    buttons: [
      {
        x: 250,
        y: 250,
        text: 'Small House',
        targetScene: 'small-house'
      },
      {
        x: 550,
        y: 250,
        text: 'Village',
        targetScene: 'village'
      }
    ]
  }


};

// Scene Management
let currentScene = 'small-house';

function renderScene(sceneName) {
  app.stage.removeChildren();
  app.renderer.backgroundColor = scenes[sceneName].backgroundColor;

  if (sceneName === 'map') {
      // Get the buttons for the current state
      let currentButtons = [...scenes[sceneName].buttons];
      if (gameState.ruinsUnlocked) {
          currentButtons.push({
              x: 400,
              y: 400,
              text: 'Hidden Ruins',
              targetScene: 'ruins'
          });
      }

      // Render map buttons using currentButtons
      currentButtons.forEach(button => {
          const graphics = new PIXI.Graphics();
          graphics.lineStyle(3, 0xFFFFFF, 1);
          graphics.beginFill(0x808080, 0.5);
          graphics.drawCircle(button.x, button.y, 100);
          graphics.endFill();

          const text = new PIXI.Text(button.text, {
              fontFamily: 'Arial',
              fontSize: 24,
              fill: 0xFFFFFF
          });
          text.anchor.set(0.5);
          text.x = button.x;
          text.y = button.y;

          graphics.interactive = true;
          graphics.buttonMode = true;
          graphics.hitArea = new PIXI.Circle(button.x, button.y, 100);

          graphics.on('pointerdown', () => {
              renderScene(button.targetScene);
              currentScene = button.targetScene;
          });

          app.stage.addChild(graphics);
          app.stage.addChild(text);
      });
  } else {
      // Render scene circles
      scenes[sceneName].circles.forEach(circle => {
          const graphics = new PIXI.Graphics();
          graphics.lineStyle(3, 0xFFFFFF, 1);
          graphics.beginFill(circle.color, 0);
          graphics.drawCircle(circle.x, circle.y, circle.radius);
          graphics.endFill();

          graphics.interactive = true;
          graphics.buttonMode = true;
          graphics.hitArea = new PIXI.Circle(circle.x, circle.y, circle.radius);

          graphics.on('pointerdown', (event) => {
              if (circle.specialInteraction) {
                  circle.specialInteraction.action();
              } else {
                  showPopup(circle.description);
              }
          });

          app.stage.addChild(graphics);
      });
  }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  renderScene('small-house');
  startTimer();
});

mapButton.addEventListener('click', () => {
  renderScene('map');
  currentScene = 'map';
});

pauseButton.addEventListener('click', (e) => {
  e.stopPropagation();
  togglePause();
});

document.addEventListener('click', (e) => {
  if (isPaused && e.target !== pauseButton) {
      togglePause();
  }
});

popupClose.addEventListener('click', hidePopup);
resetButton.addEventListener('click', resetGame);