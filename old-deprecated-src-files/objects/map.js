import Phaser from "phaser";

const Player = require('../../src/objects/player');
const Ogre = require('../../src/objects/enemies/ogre');
const GameCoin = require('../../src/objects/items/coin');
const Target = require('./target');
const Interact = require('../../src/interfaces/interact')

/**
 * @classdesc 
 * 
 * Wraps and manages a Phaser.Tilemap, loads objects, applies physics to objects, and places player in the scene.
 * 
 * Will eventually handle loading of other maps.
 * 
 * @deprecated
 * 
 * @memberof ClubCrawler.Objects
 */
class DungeonMapManager {
    


    /**
     * Creates the map floor tiles, wall tiles, and spawns.
     * @constructor
     * @param {Object} config - A configuration object
     * @param {Phaser.Scene} config.scene - The {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene} creating this map manager
     * @param {number} [config.scale=1] - The amount to scale the Tilemap. (Not yet implemented)
     * @param {string} [config.map] - The map to load. Should match what was loaded in preload function. (Todo - Create documentation for available maps)
     * 
     */
    constructor(config) {

        this.scene = config.scene;
        /**
         * The amount to scale the map - not yet implemented
         * @property {number}
         */
        this.scale = config.scale ? config.scale : 1;

        // blue world will be the default world
        let mapKey = config.map ? config.map : 'blueworld';

        /**
         * The {@link https://newdocs.phaser.io/docs/3.52.0/Phaser.Tilemaps.Tilemap Phaser.Tilemaps.Tilemap} for the current scene
         */
        this.map = this.scene.make.tilemap({key: mapKey})

        if(mapKey == 'blueworld') {
            this.tileset = this.map.addTilesetImage('blue-patterned-world','blue-tileset'); 
            this.floors = this.map.createLayer('Floors', this.tileset, 0, 0);
            this.walls = this.map.createLayer('Walls', this.tileset, 0, 0);            
            this.walls.setCollisionByExclusion(-1, true);
        }
        /**
         * Player start X coordinates.
         * @default 0
         */
        this.startX = 0;
        /**
         * Player start Y coordinates.
         * @default 0
         */
        this.startY = 0;

        // set up player spawn
        this.map.getObjectLayer('Spawns').objects.forEach( (item) => {
            if(item.type == "playerspawn") {
                this.startX = item.x;
                this.startY = item.y;
            }
        });

        /**
         * Physics Group
         */
        this.targets = this.scene.physics.add.group();
        this.enemies = this.scene.physics.add.group();

    }

    
    /**
     * Places player at startX, startY, which should have been set by the Spawn object on map creation. Sets player to collide with walls.
     * 
     * @param {Player} player - The player
     */
     startPlayer(player) {
        player.setX(this.startX);
        player.setY(this.startY);
        player.reticle.moveToPlayer();
        this.scene.physics.add.collider(this.walls, player);
    }


    /**
     * Places objects in the 'Items' layer. Should be called after startPlayer has been called so objects do not overlap player.
     */
    placeMapObjects() {
        // set up coins / points
        this.map.getObjectLayer('Items').objects.forEach( (item) => {
            if(item.type == "points") {
                let coin = new GameCoin({scene:this.scene, player:this.scene.player},item);
            }
        });

        /**
         * Set up targettable world objects
         */
        this.map.getObjectLayer('Spawns').objects.forEach( (item)=> {
            if(item.type == "spawn-point") {
                let spawnType = "cylinder";
                let targettable = false;
                item.properties.forEach( (property)=> {
                    if(property.name == "spawns") {
                        spawnType = property.value;
                    }
                    if(property.name == "targettable") {
                        targettable = property.value;
                    }
                } );
                if(spawnType == "cylinder") { 
                    let newItem = new Target({
                        scene:this.scene, 
                        x:item.x, 
                        y:item.y
                    });
                    if(targettable) {
                        this.targets.add(newItem);
                    }
                }
            }
            if(item.type == "enemy-spawn") {
                if(item.name == "Ogre") {
                    let cx = item.width / 2 + item.x;
                    let cy = item.height / 2 + item.y;
                    let newOgre = new Ogre({
                        scene:this.scene,
                        x: cx,
                        y: cy
                    });
                    this.enemies.add(newOgre);
                }
            }
        });
        this.scene.physics.add.collider(this.targets, this.scene.player);
        this.scene.physics.add.collider(this.targets, this.walls);
        this.scene.physics.add.collider(this.enemies, this.walls);
        this.scene.physics.add.collider(this.enemies, this.targets);
        //this.scene.physics.add.collider(this.enemies, this.scene.player, Interact.DamageCollision);
        this.scene.physics.add.collider(this.enemies, this.scene.player, Interact.DamageCollision);
    }


}

module.exports = DungeonMapManager;