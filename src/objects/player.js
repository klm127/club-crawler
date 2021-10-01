import Phaser from "phaser";

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
        })
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


        //set game properties
        this.health = config.health ? config.health : 50;
        this.velocityIncrement = config.velocityIncrement ? config.velocityIncrement : 25;
        this.weapon = null; // todo
        console.log('player construction complete');
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
    }
}

module.exports = Player