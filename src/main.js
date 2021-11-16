import Phaser from 'phaser';

const TitleScreen = require('./scenes/TitleScreen');
const DungeonCrawlerGame = require('./scenes/DungeonCrawlerGame');
const DungeonCrawlerOverlay = require('./scenes/DungeonCrawlerOverlay');
const DebugOverlay = require('./scenes/DebugOverlay');
const GameOver = require('./scenes/GameOver');
const GameWin = require('./scenes/GameWin');

const parent = document.getElementById("club-crawler-container")

const leftUI = document.createElement('div');
leftUI.id = "club-crawler-left-UI";
parent.appendChild(leftUI);

const config = {
    width: 800,
    height: 800,
    type: Phaser.AUTO,
    parent : parent,
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

const rightUI = document.createElement('div');
rightUI.id = "club-crawler-right-UI"
setTimeout( ()=> {
    parent.appendChild(rightUI);
},1000)


game.scene.add('titlescreen', TitleScreen);
game.scene.add('crawlergame', DungeonCrawlerGame);
game.scene.add('gameover', GameOver);
game.scene.add('gamewin', GameWin);
game.scene.add('debugoverlay', DebugOverlay);
game.scene.add('crawleroverlay', DungeonCrawlerOverlay);
game.scene.start('titlescreen');
