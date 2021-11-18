import Phaser from 'phaser';

const TitleScreen = require('./scenes/TitleScreen');
const DungeonCrawlerGame = require('./scenes/DungeonCrawlerGame');
const DungeonCrawlerOverlay = require('./scenes/DungeonCrawlerOverlay');
const DebugOverlay = require('./scenes/DebugOverlay');
const GameOver = require('./scenes/GameOver');
const GameWin = require('./scenes/GameWin');

const LeftUI = require('./domUI/leftUI');
const RightUI = require('./domUI/rightUI');

const parent = document.getElementById("club-crawler-container")

const leftUIelement = document.getElementById("club-crawler-left-ui");
const leftUI = new LeftUI(leftUIelement);


const rightUIelement = document.getElementById("club-crawler-right-ui")
const rightUI = new RightUI(rightUIelement);

const config = {
    width: 800,
    height: 800,
    type: Phaser.AUTO,
    parent : document.getElementById("club-crawler-canvas-container"),
    physics: {
        default: 'arcade',
        aracade: {
            gravity: {
                y: 0
            },
            debug: true
        }
    }
}

const game = new Phaser.Game(config);


game.scene.add('titlescreen', TitleScreen);
game.scene.add('crawlergame', DungeonCrawlerGame);
game.scene.add('gameover', GameOver);
game.scene.add('gamewin', GameWin);
game.scene.add('debugoverlay', DebugOverlay);
game.scene.add('crawleroverlay', DungeonCrawlerOverlay);
game.scene.start('titlescreen');
