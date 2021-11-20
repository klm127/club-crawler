/**
 * @module initialize
 * @description Initializes all instances needed to assemble the club crawler game and the associated DOM User Interface.
 */

import Phaser from 'phaser';

/** @type ClubCrawler.Scenes.TitleScreen */
const TitleScreen = require('./scenes/TitleScreen');
/** @type ClubCrawler.Scenes.DungeonCrawlerGame  */
const DungeonCrawlerGame = require('./scenes/DungeonCrawlerGame');
/** @type ClubCrawler.Scenes.GameOver */
const GameOver = require('./scenes/GameOver');
/** @type ClubCrawler.Scenes.GameWin */
const GameWin = require('./scenes/GameWin');
/** @type ClubCrawler.Data.dataManager */
const dataManager = require('./objects/data');

const LeftUI = require('./domUI/leftUI');
const RightUI = require('./domUI/rightUI');
const UIManager = require('./domUI/uiManager');

/** @type HTMLElement */
const parent = document.getElementById("club-crawler-container")

/** @type HTMLElement */
const leftUIelement = document.getElementById("club-crawler-left-ui");
/** @type ClubCrawler.DOMUserInterface.LeftUI */
const leftUI = new LeftUI(leftUIelement);
/** @type HTMLElement */
const rightUIelement = document.getElementById("club-crawler-right-ui")
/** @type ClubCrawler.DOMUserInterface.RightUI */
const rightUI = new RightUI(rightUIelement);

/** @type ClubCrawler.DOMUserInterface.DOMUIManager */
const uiManager = new UIManager(leftUI, rightUI, dataManager);



/**
 * @type Phaser.Types.Core.GameConfig
 * @description The Phaser configuration for club crawler.
 * @see {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Core.GameConfig External link to Phaser.Types.Core.GameConfig}
 * @property {number} width=800 - width of the Phaser canvas
 * @property {number} height=800 - height of the Phaser canvas
 * @property {enum} type=Phaser.AUTO - Detects if OpenGL is enabled on browser and uses it if it is. {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.AUTO External link to Phaser docs}
 * @property {HTMLElement} parent=#club-crawler-canvas-container - The containing parent element.
 * @property {Phaser.Types.Core.PhysicsConfig} physics - The physics configuration. {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Types.Core.PhysicsConfig External link to Phaser Docs}
 * @property {string} physics.default=arcade - Arcade physics are used.
 * @property {boolean} physics.arcade.debug=false - Whether to show physics debug options
 * 
 */
const config = {
    width: 800,
    height: 800,
    type: Phaser.AUTO,
    parent : document.getElementById("club-crawler-canvas-container"),
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 0
            },
            debug: false
        }
    }
}

/** 
 * @type Phaser.Game
 * @see {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Game external link to Phaser.Game}
*/
const game = new Phaser.Game(config);


game.scene.add('titlescreen', TitleScreen);
game.scene.add('crawlergame', DungeonCrawlerGame);
game.scene.add('gameover', GameOver);
game.scene.add('gamewin', GameWin);
game.scene.start('titlescreen');
