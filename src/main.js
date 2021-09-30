import Phaser from 'phaser';

import TitleScreen  from './scenes/TitleScreen';

const config = {
    width: 600,
    height: 600,
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
game.scene.start('titlescreen');