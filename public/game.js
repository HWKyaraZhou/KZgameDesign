document.addEventListener("DOMContentLoaded", () => {
    // Create the Pixi application
    const app = new PIXI.Application({
      width: 800,  // Canvas width
      height: 600, // Canvas height
      backgroundColor: 0x1099bb, // Background color
    });
  
    // Append the view (canvas) to the body
    document.body.appendChild(app.view);
  
    // Load assets (if needed)
    PIXI.Loader.shared
      .add('background', '\\wsl.localhost\Ubuntu-20.04\home\kyarazhou\KZgameDesign\room.webp') // Replace with your background image path
      .load(setup);
  
    function setup() {
      // Create a scene background
      const background = new PIXI.Sprite(PIXI.Loader.shared.resources['background'].texture);
      app.stage.addChild(background);
  
      // Add clickable areas
      const clickableAreas = [
        { x: 100, y: 100, width: 150, height: 150, event: handleEvent1 },
        { x: 400, y: 100, width: 150, height: 150, event: handleEvent2 },
        { x: 250, y: 300, width: 150, height: 150, event: handleEvent3 },
      ];
  
      clickableAreas.forEach(area => createClickableArea(area));
    }
  
    // Function to create clickable areas
    function createClickableArea({ x, y, width, height, event }) {
      const area = new PIXI.Graphics();
      area.beginFill(0xff0000, 0.5); // Semi-transparent red
      area.drawRect(x, y, width, height);
      area.endFill();
      area.interactive = true;
      area.buttonMode = true;
      area.on('pointerdown', event);
      app.stage.addChild(area);
    }
  
    // Event handlers
    function handleEvent1() {
      console.log("Event 1 triggered!");
      alert("You clicked area 1!");
    }
  
    function handleEvent2() {
      console.log("Event 2 triggered!");
      alert("You clicked area 2!");
    }
  
    function handleEvent3() {
      console.log("Event 3 triggered!");
      alert("You clicked area 3!");
    }
  });
  