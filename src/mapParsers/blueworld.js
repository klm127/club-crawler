import Phaser from "phaser";

const Player = require('../objects/player');
const Ogre = require('../objects/enemies/ogre');
const GameCoin = require('../objects/items/coin');
const Cylinder = require('../objects/destructibles/cylinder');
const Interact = require('../interfaces/interact');
const Parse = require('../utility/parse');
const dataManager = require('../objects/data');

const BLUEWORLD_DEFAULTS = {
    tileSetKey: "blue-tileset",
    mapKey: "blueworld",
    objectConstructorMappings: {
        layers: {
            Spawns: {
                type: {
                    "spawn-point": {
                        spawns: {
                            "cylinder": {
                                creates: Cylinder,
                                group: "destructibles"
                            }
                        }
                    },
                    "enemy-spawn": {
                        name: {
                            Ogre: {
                                creates: Ogre,
                                group: "enemies"
                            }
                        }
                    },
                    "playerspawn": {
                        creates: Parse.setPlayerStart,
                        function: true
                    }
                }
            },
            Items: {
                type: {
                    points: {
                        creates: GameCoin
                    }
                }                
            }
        }
    }

}
/**
 * @classdesc  
 * Parses the BlueWorld map found in static/maps/blueworld.json
 * 
 * Wraps and manages a Phaser.Tilemap, loads objects, applies physics to objects, and places player in the scene.
 * 
 * Will eventually handle loading of other maps.
 * @memberof ClubCrawler.Parsers
 * 
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
        // this.destructibles = this.scene.physics.add.group();
        // this.enemies = this.scene.physics.add.group();

    }

    
    /**
     * Places player at startX, startY, which should have been set by the Spawn object on map creation. Sets player to collide with walls.
     * 
     * @param {Player} player - The player
     */
    startPlayer(player) {
        if(dataManager.debug.on && dataManager.debug.map.placePlayer) {
            dataManager.log(`Starting player at ${this.startX}, ${this.startY}`);
        }
        player.setX(this.startX);
        player.setY(this.startY);
        if(player.reticle) {
            player.reticle.moveToPlayer();
        }
        let wallCollider = this.scene.physics.add.collider(this.walls, player);
        if(dataManager.debug.on && dataManager.debug.map.placePlayer) {
            dataManager.log(`Created a ${wallCollider.constructor.name} between ${this.walls.constructor.name} and ${player.constructor.name}`);
        }
    }

    /**
     * This will be improved so colliders can be defined in the mapping object as well.
     * 
     * @deprecated
     * 
     * @returns {any}
     */
    addColliders() {
        this.scene.physics.add.collider(this.walls, this.scene.player);
        this.scene.physics.add.collider(this.destructibles, this.walls);
        this.scene.physics.add.collider(this.enemies, this.walls);
        this.scene.physics.add.collider(this.enemies, this.destructibles);
        this.scene.physics.add.collider(this.enemies, this.enemies);
        this.scene.physics.add.collider(this.enemies, this.scene.player, Interact.DamageCollision);
    }



    /**
     * Places objects according to the mappings
     * 
     * @returns {any}
     */
    placeMappedObjects() {
        var mapManager = this; // for pass through
        if(dataManager.debug.on && dataManager.debug.map.layers) {
            dataManager.log(`do we have layers? ${Object.keys(this.objectConstructorMappings.layers)}`);
        }
        var layers = this.objectConstructorMappings.layers; // see DEFAULTS const at top of this file for layer mapping example
        for(let layerName of Object.keys(layers)) { 
            let mapLayer = this.map.getObjectLayer(layerName); // get the layer from Phaser
            
            if(dataManager.debug.on && dataManager.debug.map.layers) {
                dataManager.log(`Trying to grab a map layer resulted in: ${mapLayer.constructor.name}`)
            }
            mapLayer.objects.forEach( (tiledObject)=> { // iterate through each object in the layer
                let extractedProperties = Parse.getFlatTiledObjectProperties(tiledObject.properties); // get the custom properties, flattened
                if(dataManager.debug.on && dataManager.debug.map.layers) {
                    dataManager.log(`tiledObject ${tiledObject.name} extracted Properties: ${Object.keys(extractedProperties)}`)
                }
                Object.assign(tiledObject, extractedProperties); // assign the custom properties to this object as top level properties rather than nested
                let constructorConfig = Parse.getConstructorConfigFromLayerMap(tiledObject, layers[layerName]); // find the object with the "create" property that matches to this
                if(dataManager.debug.on && dataManager.debug.map.layers) {
                    dataManager.log(`found ${layerName} constructor config properties: ${Object.keys(constructorConfig)}`)
                }
                if(constructorConfig.group) { // if the constructor configuration says the new object will be part of a group...
                    if(!mapManager[constructorConfig.group]) {  // if this mapManager doesn't have a property corresponding to that group name yet...
                        mapManager[constructorConfig.group] = mapManager.scene.physics.add.group(); // then create that property as a new physics group
                    }
                }
                if(constructorConfig.creates) {
                    
                    if(dataManager.debug.on && dataManager.debug.map.layers) {
                        dataManager.log(`Constructor config mapping found: ${constructorConfig.constructor.name}`)
                    }
                    let target = constructorConfig.creates;
                    let constructorParameters = {
                        scene: mapManager.scene,
                        x: tiledObject.x,
                        y: tiledObject.y,
                        tiledData: tiledObject
                    }
                    if(!constructorConfig.function) { // if the target is a class, then create a class and add it to the physics group if there is one
                        let newInstance = new target(constructorParameters);
                        if(dataManager.debug.on && dataManager.debug.map.layers) {
                            dataManager.log(`Creating an instance of: ${newInstance.constructor.name}`)
                        }
                        if(constructorConfig.group) {
                            mapManager[constructorConfig.group].add(newInstance);
                        }
                    } else { //if it's not a class, target should be a function
                        let funcresult = target(constructorParameters);
                        if(dataManager.debug.on && dataManager.debug.map.functions) {
                            dataManager.log(`Function call, result: ${funcresult}`);
                        }
                    }
                }
            });
        }
    }
}

module.exports = BlueWorldParser;