
import Phaser from "phaser";

/**
 * @classdesc
 * 
 * The bullet.
 * 
 * Will probably be eventually abstracted and multiple bullet types will be created, possibly for various reticles and weapons
 * 
 * Right now it uses a static method to generate the bullets. This might be better as a "BulletFactory" object so the bullets can all have some set of parameters
 * 
 * @memberof ClubCrawler.Objects
 */
 class Bullet extends Phaser.GameObjects.Image {

    /**
     * Preloads the reticle image asset
     * @param {Phaser.Scene} scene - See {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene}
     */
    static preload(scene) {
        scene.load.image('bullet', 'images/bullet1.png');
        scene.load.audioSprite('bullet', 'sounds/bullet.json', 'sounds/bullet.mp3');
    }

    /**
     * 
     * 
     * @param {Object} config - The config object
     * @param {ClubCrawler.Scenes.DungeonCrawlerGame} config.scene - The scene
     * @param {number} [config.x = 0] - The x coordinate to start
     * @param {number} [config.y = 0] - The y coordinate to start
     */
    constructor(config) {
        super(config.scene, config.x ? config.x : 0, config.y ? config.y : 0, 'bullet');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.duration = config.duration ? config.duration : 500;
        this.speed = config.speed ? config.speed : 800;
        this.body.setAngularVelocity(config.angularVelocity ? config.angularVelocity : 2000);
        this.body.setBounce(0.3,0.3);

        //create two SFX sprites, one for shot and one for bounce
        this.shotFX = this.scene.sound.addAudioSprite('bullet');
        this.shotFX.play('shot1');
        this.bounceFX = this.scene.sound.addAudioSprite('bullet');
        this.scene.physics.add.collider( this, this.scene.mapManager.walls, ()=>{
            this.bounceFX.play('bounce1') 
        }, undefined, this);
        // this.scene.physics.add.collider(this, this.scene.mapManager.targets, hitTarget);

        //destory the bullet after a time
        this.scene.time.delayedCall(1000,()=>{  
            //destroy the sfx sprites a little later
            this.scene.time.delayedCall(1000, (shot, bounce)=> { 
                shot.destroy();
                bounce.destroy();
            },[this.shotFX, this.bounceFX]);
            this.destroy();
        }, [], this);
    }
    /**
     * override to destroy sfx also
     */
    destroyWithFX() {
        this.shotFX.destroy();
        this.bounceFX.destroy();
        this.destroy();    
    }

    static makeBullet(player) {
        let newBullet = new Bullet({
            scene: player.scene,
            x: player.x,
            y: player.y
        });
        let hypoteneuse = Phaser.Math.Distance.Between(player.x, player.y, player.reticle.x, player.reticle.y);

        let adjacent = player.reticle.x - player.x;
        let opposite = player.reticle.y - player.y;
        let sine = opposite/hypoteneuse;
        let cosine = adjacent/hypoteneuse;

        let speedX = newBullet.speed * cosine;
        let speedY = newBullet.speed * sine; 


        newBullet.body.setVelocityX(speedX);
        newBullet.body.setVelocityY(speedY);
    }

}

module.exports = Bullet;