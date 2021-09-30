import Phaser from "phaser";

/**
 * Wraps and manages a Phaser.Tilemap
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

    }

    constructor(config) {
        let scene = config.scene;
        let mapKey = config.map ? config.map : 'blueworld';
        // scaling not implemented yet
        this.scale = config.scale ? config.scale : 1;

        console.log(scene);
        this.map = scene.make.tilemap({key: mapKey})

        if(mapKey == 'blueworld') {
            this.tileset = this.map.addTilesetImage('blue-patterned-world','blue-tileset'); 
            this.floors = this.map.createLayer('Floors', this.tileset, 0, 0);
            this.walls = this.map.createLayer('Walls', this.tileset, 0, 0);            
            this.walls.setCollisionByExclusion(-1, true);
        }
        this.startX = 0;
        this.startY = 0;

        this.map.getObjectLayer('Spawns').objects.forEach( (item) => {
            if(item.type == "playerspawn") {
                console.log('good');
                this.startX = item.x;
                this.startY = item.y;
            }
        });
        console.log('map manager construction complete')

        console.log(this.floors);

        this.scene = scene;

    }
    startPlayer(player) {
        player.setX(this.startX);
        player.setY(this.startY);        
        this.scene.physics.add.collider(this.walls, player);
    }
}