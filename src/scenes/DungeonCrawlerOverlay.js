import Phaser from "phaser";
import {dataManager} from "../objects/data";

export default class DungeonCrawlerOverlay extends Phaser.Scene 
{
    preload() {

    }
    create() {
        this.add.text(10, 20, "Club Crawler Overlay Placeholder", {
            color: "rgba(100,100,200,0.8)",
            fontSize: 25
        });
        this.pointCount = this.add.text(10,750,"Points  " + dataManager.score, {
            color:`white`,
            shadow: {
                offsetX: 1,
                offsetY: 1,
                color: 'red',
                blur: 1
            },
            fontFamily: 'Consolas, Courier',
            stroke: 'rgb(100,0,0)',
            strokeThickness: 2,
            fontSize: 18
        });

        dataManager.emitter.on('scoreChange', this.pointsChange, this)
        
    }

    pointsChange(){
        this.pointCount.setText("Points  " + dataManager.score);
        this.pointCount.updateText();
        console.log('event detected');
    }

    
    update(time, delta) {

    }

}
