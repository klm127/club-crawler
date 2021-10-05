
import Phaser from "phaser";

const Player = require('../objects/player');
const Ogre = require('../objects/enemies/ogre');
const GameCoin = require('../objects/coin');
const Cylinder = require('../objects/destructibles/cylinder');
const Interact = require('../interfaces/interact');
const Parse = require('../utility/parse');
const dataManager = require('../objects/data');

const BLUEWORLD_DEFAULTS = {
    tileSetKey: "blue-tileset",
    mapKey: "blueworld",
    objectConstructorMappings: {
        layers: {
            Items: {
                points: {
                    create: GameCoin
                }
            },
            Spawns: {
                "spawn-point": {
                    spawnType: {
                        cylinder: {
                            create: Cylinder,
                            group: "destructibles"
                        }
                    }
                },
                "enemy-spawn": {
                    name: {
                        Ogre: {
                            create: Ogre,
                            group: "enemies"
                        }
                    }

                }
            }
        }
    }

}
/**
 * @classdesc 
 * 
 * Parses the BlueWorld map found in static/maps/blueworld.json
 * 
 * Wraps and manages a Phaser.Tilemap, loads objects, applies physics to objects, and places player in the scene.
 * 
 * Will eventually handle loading of other maps.
 * 
 * @memberof ClubCrawler.Objects
 */
class BlueWorldParser { 


    /**
     * Creates the map floor tiles, wall tiles, and spawns.
     * @constructor
     * @param {Object} config - A configuration object
     * @param {Phaser.Scene} config.scene - The {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene} creating this map manager
     * 
     */
    constructor(config) {
        Object.assign(this, BLUEWORLD_DEFAULTS);
        Object.assign(this, config);
        this.scene = config.scene;

        /**
         * The amount to scale the map - not yet implemented
         * @property {number}
         */
        this.scale = config.scale ? config.scale : 1;

        /**
         * The {@link https://newdocs.phaser.io/docs/3.52.0/Phaser.Tilemaps.Tilemap Phaser.Tilemaps.Tilemap} for the current scene
         */
        this.map = this.scene.make.tilemap({key: config.mapKey ? BLUEWORLD_DEFAULTS.mapKey : "blueworld"});
        this.tileset = this.map.addTilesetImage('blue-patterned-world', config.tileSetKey ? BLUEWORLD_DEFAULTS.tileSetKey : "blue-tileset"); 
        this.floors = this.map.createLayer('Floors', this.tileset, 0, 0);
        this.walls = this.map.createLayer('Walls', this.tileset, 0, 0);            
        this.walls.setCollisionByExclusion(-1, true);
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
        this.destructibles = this.scene.physics.add.group();
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
        if(player.reticle) {
            player.reticle.moveToPlayer();
        }
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
                let properties = Parse.TiledObjectCustomProperties(item.properties);

                let spawnType = properties.spawns ? properties.spawns : "cylinder";
                let targettable = properties.targettable ? properties.targettable : false;

                if(dataManager.debug.destructibles.colliders && dataManager.debug.on) { 
                    dataManager.log(`targettable? ${targettable} spawnType? ${spawnType}`);
                    dataManager.log(properties)
                }

                if(spawnType == "cylinder") { 
                    let newItem = new Cylinder({
                        scene:this.scene, 
                        x:item.x, 
                        y:item.y
                    });
                    if(targettable) {
                        this.destructibles.add(newItem);
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
        },this);
        this.scene.physics.add.collider(this.destructibles, this.scene.player);
        this.scene.physics.add.collider(this.destructibles, this.walls);
        this.scene.physics.add.collider(this.enemies, this.walls);
        this.scene.physics.add.collider(this.enemies, this.targets);
        //this.scene.physics.add.collider(this.enemies, this.scene.player, Interact.DamageCollision);
        this.scene.physics.add.collider(this.enemies, this.scene.player, Interact.DamageCollision);
    }

    placeMappedObjects() {
        let layers = this.objectConstructorMappings.layers;
        for(let layerName in Object.keys(layers)) {
            let mapLayer = this.map.getObjectLayer(layerName);
            mapLayer.objects.forEach( (tiledObject)=> {
                if(tiledObject.properties) {
                    let extractedProperties = Parse.TiledObjectCustomProperties(tiledObject.properties);
                    Object.assign(tiledObject, extractedProperties);
                }

            });
        }
    }


}

module.exports = BlueWorldParser;