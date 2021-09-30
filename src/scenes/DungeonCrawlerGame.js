import Phaser from "phaser";
import Player from "../objects/player";
import DungeonMapManager from "../objects/map";

export default class DungeonCrawlerGame extends Phaser.Scene 
{
    preload() {
        Player.preload({scene: this});
        DungeonMapManager.preload({scene:this, mapName:'blueworld'});
    }

    create() {

        let mapManager = new DungeonMapManager({scene: this, map: 'blueworld'});
        this.player = new Player({scene:this, x:200, y: 200, scale:0.5, maxSpeed: 540, drag:1000, velocityIncrement: 55}); 


        // camera follows player
        this.cameras.main.startFollow(this.player, true);

        //place the player
        mapManager.startPlayer(this.player);

        console.log('player',this.player);

        //launch the overlay 
        this.scene.launch('crawleroverlay');


        this.cursors = this.input.keyboard.createCursorKeys();
        console.log(this.cursors);
        console.log('scene construction complete');

    }
    update(time, delta) {
        if(this.cursors.left.isDown) {
            console.log('l pressed')
            this.player.move('w');
        }
        if(this.cursors.right.isDown) {
            this.player.move('e');
        }
        if(this.cursors.down.isDown) {
            this.player.move('s');
        }
        if(this.cursors.up.isDown) {
            this.player.move('n');
        }

    }

}