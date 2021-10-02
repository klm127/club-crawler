import Phaser from "phaser";
const musicManager = require('../objects/music');    


/** 
 * @classdesc
 * 
 * The Title Screen and start button
 * 
 * @memberof ClubCrawler.Scenes
 * @see {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene}
 */
class TitleScreen extends Phaser.Scene 
{
    preload()
    {    
        musicManager.preload(this);
    }
    create()
    {
        let gameHeight = this.game.config.height;
        let gameWidth = this.game.config.width;
        this.titleText = this.add.text(gameWidth/2,gameHeight/4, "Club Crawler", {
            color:`rgb(0,0,250)`,
            shadow: {
                offsetX: 5,
                offsetY: 5,
                color: 'gray',
                blur: 5
            },
            fontFamily: 'Consolas, Courier',
            stroke: 'rgb(0,100,0)',
            strokeThickness: 5,
            fontSize: 50
            
        }).setOrigin(0.5,0.5);

        let startText = this.add.text(gameWidth/2, gameHeight/2, "Start", {
            color: 'rgb(0,250,0)'
        }).setOrigin(0.5, 0.5);
        startText.setInteractive();
        startText.on('pointerdown', ()=> {
            this.scene.stop('titlescreen');
            this.scene.start('crawlergame')
        })

        this.titleText.green = 0;
        this.titleText.red = 0;
        musicManager.create(this);
    }
    update(time,delta) {
        if(this.titleText.green < 255) {
            this.titleText.green += 1;
            this.titleText.angle += 0.01;
            let scaleX = this.titleText.scaleX;
            this.titleText.setScale(scaleX+0.001, 1);
        } else {
            if(this.titleText.red < 255) {
                this.titleText.red += 1;
                this.titleText.angle -= 0.01;
            }
            else {
                if(this.titleText.scaleY < this.titleText.scaleX - 0.1) {
                    this.titleText.setScale(this.titleText.scaleX, this.titleText.scaleY + 0.01);
                }
            }
        }
        this.titleText.setColor(`rgb(${this.titleText.red},${this.titleText.green},250)`)

    }
}

module.exports = TitleScreen