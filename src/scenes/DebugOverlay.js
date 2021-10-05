import Phaser from "phaser";

const dataManager = require('../objects/data');

/** 
 * @classdesc
 * A debug overlay for getting information on screen that can't easily be printed to the console
 * @memberof ClubCrawler.Scenes
 * @extends Phaser.Scene
 * @see {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene}
 */
class DebugOverlay extends Phaser.Scene {
    preload() {

    }
    create() {

        let gameWidth = this.game.config.width;
        let gameHeight = this.game.config.height;
        
        this.debugText = this.add.text(gameWidth/4,gameHeight/4, dataManager.debugLines, {
            wordWrap: {
                useAdvancedWrap: true
            }
        });
        dataManager.emitter.on('debugChange', this.debugChange, this);

    }
    debugChange() {
        this.debugText.setText(dataManager.debugLines);
        if(dataManager.debugLines.length > 10) {
            dataManager.debugLines.shift();
        }
        this.time.delayedCall(3000, ()=> {
            dataManager.debugLines.shift();
            this.debugText.setText(dataManager.debugLines);
        })

    }
}

module.exports = DebugOverlay;