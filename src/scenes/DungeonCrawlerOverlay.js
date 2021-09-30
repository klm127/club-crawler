import Phaser from "phaser";

export default class DungeonCrawlerOverlay extends Phaser.Scene 
{
    preload() {

    }
    create() {
        this.add.text(10, 20, "Club Crawler Overlay Placeholder", {
            color: "rgba(100,100,200,0.8)",
            fontSize: 25
        });

    }
    update(time, delta) {

    }

}