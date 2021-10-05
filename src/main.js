import Phaser from 'phaser';

const TitleScreen = require('./scenes/TitleScreen');
const DungeonCrawlerGame = require('./scenes/DungeonCrawlerGame');
const DungeonCrawlerOverlay = require('./scenes/DungeonCrawlerOverlay')
const GameOver = require('./scenes/GameOver');
const GameWin = require('./scenes/GameWin');

const config = {
    width: 800,
    height: 800,
    type: Phaser.AUTO,
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
game.scene.add('crawleroverlay', DungeonCrawlerOverlay);
game.scene.add('gameover', GameOver);
game.scene.add('gamewin', GameWin);
game.scene.start('titlescreen');
