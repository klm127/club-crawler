import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Image {
    static preload(config) {
        
        // load the texture atlas
        config.scene.load.atlas({
            key:'playerimages', 
            textureURL: 'images/discord-avatars.png', 
            atlasURL: 'atlas/discord-avatars.json'
        })
        
    }
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