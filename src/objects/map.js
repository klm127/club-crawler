import Phaser from "phaser";
import GameCoin from "./coin";

/**
 * Wraps and manages a Phaser.Tilemap
 * 
 * First constructed, then player loaded, then placeMapObjects is called... must be done in that order for layering 
 */
export default class DungeonMapManager {
    
    /**
     * Preload calls load methods on the scene it is passed in the config object.
     */
    static preload(config) {
        if(config.mapName == 'blueworld') {
            config.scene.load.tilemapTiledJSON('blueworld','maps/blueworld.json');
            config.scene.load.image('blue-tileset', 'images/tilesets/blue-patterned-world.png');
        }
        GameCoin.preload(config.scene); // load coin image

    }

    constructor(config) {

        this.scene = config.scene;
        // scaling not implemented yet
        this.scale = config.scale ? config.scale : 1;

        // blue world will be the default world
        let mapKey = config.map ? config.map : 'blueworld';

        // Phaser.Tilemap
        this.map = this.scene.make.tilemap({key: mapKey})

        if(mapKey == 'blueworld') {
            this.tileset = this.map.addTilesetImage('blue-patterned-world','blue-tileset'); 
            this.floors = this.map.createLayer('Floors', this.tileset, 0, 0);
            this.walls = this.map.createLayer('Walls', this.tileset, 0, 0);            
            this.walls.setCollisionByExclusion(-1, true);
        }
        this.startX = 0;
        this.startY = 0;

        // set up spawns
        this.map.getObjectLayer('Spawns').objects.forEach( (item) => {
            if(item.type == "playerspawn") {
                console.log('good');
                this.startX = item.x;
                this.startY = item.y;
            }
        });

    }

    placeMapObjects() {
        // set up coins / points
        this.map.getObjectLayer('Items').objects.forEach( (item) => {
            if(item.type == "points") {
                let coin = new GameCoin({scene:this.scene, player:this.scene.player},item);

            }
        });
    }

    startPlayer(player) {
        player.setX(this.startX);
        player.setY(this.startY);        
        this.scene.physics.add.collider(this.walls, player);
    }
}