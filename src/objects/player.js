import Phaser from "phaser";

const Weapon = require('./weapon');
const dataManager = require('./data');

/** 
 * @classdesc 
 * A class for representing the Player in the game world.
 * @memberof ClubCrawler.Objects
 * @extends Phaser.GameObjects.Image
 * @see {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.GameObjects.Image Phaser.GameObjects.Image}
*/
class Player extends Phaser.GameObjects.Image {
    
    /**
     * Preloads assets needed for player. Currently only looks to 'images/discord-avatars.png' and 'atlas/discord-avatars.json' for player image data. Picks a random avatar from the {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene} each time the game is run.
     * 
     * See {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Loader.LoaderPlugin#atlas Phaser docs} for more info about atlases. 
     * 
     * @param {Phaser.Scene} config.scene - The {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene} doing the pre-loading.
     */
    static preload(config) {
        
        // load the texture atlas
        config.scene.load.atlas({
            key:'playerimages', 
            textureURL: 'images/discord-avatars.png', 
            atlasURL: 'atlas/discord-avatars.json'
        });
        Reticle.preload(config.scene);
    }
    /**
     * Constructs the player, gives it a physics body, selects a random Discord avatar to use as the image.
     * @param {Object} config - The configuration object
     * @param {Phaser.Scene} config.scene - The {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene} creating the Player
     * @param {number} config.x - The x location to place the player initially. If the map has a player spawn, this won't matter.
     * @param {number} config.y - The y location to place the player initially. If the map has a player spawn, this won't matter.
     * @param {number} [config.velocityIncrement=25] - The amount the player speed increases when a directional button is pressed
     * @param {number} [config.drag=100] - The amount to slow the player down when no directional is pressed
     */
    constructor(config) {

        // pick a random avatar
        let frameNames = config.scene.textures.get('playerimages').getFrameNames();
        let frameIndex = Math.floor(Math.random() * frameNames.length);
        let selectedFrame = frameNames[frameIndex]; 

        //call super
        super(config.scene, config.x, config.y, "playerimages", selectedFrame); 

        this.name = "Player";
        //add to scene
        config.scene.add.existing(this);
        if(config.scale) {
            this.setScale(config.scale, config.scale);
        }

        //make physics object
        config.scene.physics.add.existing(this);

        //set physics properties
        this.body.setMaxSpeed(config.maxSpeed ? config.maxSpeed : 100);
        this.body.setDrag(config.drag ? config.drag : 100, config.drag ? config.drag : 100);
        this.body.setBounce(0.7,0.7);

        dataManager.health = 0;
        //set game properties
        this.health = config.health ? config.health : 50;
        dataManager.changeHealth(this.health);
        this.velocityIncrement = config.velocityIncrement ? config.velocityIncrement : 25;

        //create reticle
        this.reticle = new Reticle({player:this, scene:config.scene, x:config.x, y:config.y});
        
        //create weapon
        this.weapon = new Weapon({
            scene:this.scene,
            wielder:this, 
            target:this.reticle
        });
        if(dataManager.debug.on && dataManager.debug.player.construction) {
            dataManager.log(`player constructor? ${this.constructor.name} created, props ${Object.keys(this)}`)
        }
    }
    /**
     * Applies velocity to the player, such as in response to keyboard input
     * @param {string} direction - One of "e","w","s","n"
     */
    move(direction) {
        if(direction == "e") {
            this.body.setVelocityX(this.body.velocity.x + this.velocityIncrement);
        }
        else if(direction == "w") {
            this.body.setVelocityX(this.body.velocity.x - this.velocityIncrement);
        }
        else if(direction == "s") {
            this.body.setVelocityY(this.body.velocity.y + this.velocityIncrement);
        }
        else {
            this.body.setVelocityY(this.body.velocity.y - this.velocityIncrement);
        }
        // die if out of bounds
        if(!this.scene.mapManager.floors.getTileAtWorldXY(this.x,this.y)) {
            this.die();
        };
    }
    die() {
        //die animation
        this.scene.scene.stop('crawlergame');
        this.scene.scene.start('gameover');
    }
    takeDamage(amount) {
        console.log('took damage!')
        dataManager.changeHealth(-amount);
        this.health = dataManager.health;
        if(this.health <= 0) {
            this.die();
        }

    }
}

/**
 * @classdesc
 * 
 * The targetting reticle for aiming with the mouse.
 * 
 * @memberof ClubCrawler.Objects
 */
class Reticle extends Phaser.GameObjects.Image {


    /**
     * Description
     * @param {Object} config - The config object
     * @param {Phaser.Scene} config.scene - The {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene}
     * @param {number} [config.x = 0] - The x coordinate to start the reticle... will be updated when player moves
     * @param {number} [config.y = 0] - The y coordinate to start the reticle... updated when player moves 
     */
    constructor(config) {
        super(config.scene, config.x ? config.x : 0, config.y ? config.y : 0, 'reticle');
        this.scene.add.existing(this);
        // this.scene.physics.add.existing(this);
        
        /**
         * @type {ClubCrawler.Objects.Player}
         */
        this.player = config.player;

        /**
         * The offset from the player the mouse was at last time it moved, for updating position as player moves
         * @type {number}
         */
        this.offsetX = 0;
        /**
         * The offset from the player the mouse was at last time it moved, for updating position as player moves
         * @type {number}
         */
        this.offsetY = 0;

        this.scene.input.on('pointermove', function(pointer) {
            this.setX(pointer.worldX);
            this.setY(pointer.worldY);
            this.offsetX = this.x - this.player.x;
            this.offsetY = this.y - this.player.y;
        }, this)

    }
    /**
     * Called by Map Manager when player is placed
     */
    moveToPlayer() {
        this.setX(this.player.x);
        this.setY(this.player.y);
    }
    /**
     * Called by DungeonCrawlerGame each update to ensure position relative to player is the same
     */
    update() {
        // this.setX(this.scene.input.activePointer.worldX);
        // this.setY(this.scene.input.activePointer.worldY);
        // this.body.setVelocityX(this.player.body.velocity.x);
        // this.body.setVelocityY(this.player.body.velocity.y);
        this.setX(this.player.x + this.offsetX);
        this.setY(this.player.y + this.offsetY);
    }

}

module.exports = Player