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
        
        this.debugText = this.add.text(10,10, dataManager.debugLines, {
            wordWrap: {
                useAdvancedWrap: true
            }
        });
        dataManager.emitter.on('debugChange', this.debugChange, this);

    }
    debugChange() {
        this.debugText.setText(dataManager.debugLines);
        if(dataManager.debugLines.length > dataManager.debug.max) {
            dataManager.debugLines.shift();
        }
        if(dataManager.debug.duration > 0) {
            this.time.delayedCall(dataManager.debug.duration, ()=> {
                dataManager.debugLines.shift();
                this.debugText.setText(dataManager.debugLines);
            })
        }

    }
}

module.exports = DebugOverlay;