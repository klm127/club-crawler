import Phaser from "phaser";
import Player from "../objects/player";

export default class DungeonCrawlerGame extends Phaser.Scene 
{
    preload() {
        Player.preload(this);
    }
    create() {

        let player = new Player({scene:this, x:200, y: 200});
        this.scene.launch('crawleroverlay');

    }
    update(time, delta) {

    }

}