Overview of the logical structure of the game.

## Initialization

`src/main.js` is the entry point for the game. 

### Communication between user interface and game

[User interface elements](ClubCrawler.DOMUserInterface.html) are in the DOM outside of the Phaser game. The [UIManager](ClubCrawler.DOMUserInterface.DOMUIManager) manages changing what the interface displays and handling user input on the interface. The [dataManager](ClubCrawler.Data.dataManager) object handles globally accessible values and hosts the event emitter. The `UIManager` listens to game events, like health changes and inventory pickups, on `dataManager.emitter` and posts UI change events to the same.

### Order of creation

The program begins by finding the containers in the html document for the game canvas, left ui, and right ui. It then creates the UI by constructing the left and right UIs, passing the container elements as parameters.

Next, UIManager is created, passing the leftUI, rightUI, and dataManager as parameters.

Next, the Phaser.Game is started, passing the canvas container html element as the "parent" property in the [configuration](module-initialize.html#config).

Next, the available scenes are added to the game graph with their associated string keys and the title screen is started.

### Later initialization - loading the player

Once "start" is clicked on the title screen, the scene [DungeonCrawlerGame](ClubCrawler.Scenes.DungeonCrawlerGame) uses various classes to build the game. After it's built, the User Interface is filled by calling [.initialize](ClubCrawler.DOMUserInterface.DOMUIManager.html#initialize) on UIManager, passing the player as a parameter. UIManager does what it needs to do to link the player weapon, inventory, health, and score to the DOM user interface.