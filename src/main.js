import Phaser from 'phaser';

import TitleScreen  from './scenes/TitleScreen';
import DungeonCrawlerGame from './scenes/DungeonCrawlerGame';
import DungeonCrawlerOverlay from './scenes/DungeonCrawlerOverlay';

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
game.scene.add('crawleroverlay', DungeonCrawlerOverlay)
game.scene.start('titlescreen');