import Phaser from "phaser";

export default class Player extends Phaser.GameObjects.Image {
    static preload(scene) {
        
        // load the texture atlas
        scene.load.atlas({
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

        //make physics object
        config.scene.physics.add.existing(this);

        //set physics properties
        this.body.maxSpeed = config.maxSpeed ? config.maxSpeed : 100;

        //set game properties
        this.health = config.health ? config.health : 50;
    }
}