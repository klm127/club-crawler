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

        this.mapManager = new DungeonMapManager({scene: this, map: 'blueworld'});
        this.player = new Player({scene:this, x:200, y: 200, scale:0.5, maxSpeed: 540, drag:1000, velocityIncrement: 55}); 


        // camera follows player
        this.cameras.main.startFollow(this.player, true);

        //place the player
        this.mapManager.startPlayer(this.player);

        //draw the map objects
        this.mapManager.placeMapObjects();

        console.log('player',this.player);

        //launch the overlay 
        this.scene.launch('crawleroverlay');

        //set up input event listening
        this.cursors = this.input.keyboard.createCursorKeys();

    }
    update(time, delta) {
        if(this.cursors.left.isDown) {
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