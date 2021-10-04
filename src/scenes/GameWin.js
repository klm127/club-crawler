import Phaser from "phaser";

const dataManager = require('../objects/data');

const STYLE = {
    playColor: "white",
    playOver:"blue",
    playClick: "red"
}


/** 
 * @classdesc
 * Game win screen
 * @memberof ClubCrawler.Scenes
 * @extends Phaser.Scene
 * @see {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene}
 */
class GameWin extends Phaser.Scene  
{
    /**
     * Preloads assets
     * 
     * @extends Phaser.Scene.preload
     */
    preload() {
        //...
    }

    /**
     * Creates text.
     * 
     * @extends Phaser.Scene.create
     */
    create() {
        let gameHeight = this.game.config.height;
        let gameWidth = this.game.config.width;
        this.gameOver = this.add.text(gameWidth/2, gameHeight/3, "😎 You win! 😎", {
            fontFamily: 'serif',
            shadow: {
                color:"white",
                x: 25,
                offsetY: 25,
                offsetX: 100
            },
            fontSize: 80,
            color: "#c7d398"
        }).setOrigin(0.5,0.5);

        this.score = this.add.text(gameWidth/2, gameHeight/2, "Your Score : " + dataManager.score, {
            fontFamily: 'sans serif',
            fontSize: 20,
        }).setOrigin(0.5,0.5)

        this.playAgain = this.add.text(gameWidth/2, gameHeight/2+200, "Play Again?",{
                fontFamily: "Sans Serif",
                fontSize: 28,
                color: STYLE.playColor
        }
        ).setOrigin(0.5,0.5);

        this.playAgain.setInteractive();

        this.playAgain.on('pointerover', (pointer)=> {
            this.playAgain.setColor(STYLE.playOver);
        });

        this.playAgain.on('pointerdown', (pointer)=> {
            this.playAgain.setColor(STYLE.playClick)
        });

        this.playAgain.on('pointerout', (pointer)=> {
            this.playAgain.setColor(STYLE.playColor);
        })

        this.playAgain.on('pointerup', (pointer)=> {
            this.scene.stop('gamewin');
            dataManager.score = 0;
            this.scene.start('titlescreen');
        });

    }

}

module.exports = GameWin;