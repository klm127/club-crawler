
import Phaser from "phaser";
import Interact from "../interfaces/interact"

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
        this.body.setMass(config.mass ? config.mass : 0.1);
        this.damage = 5;

        //create two SFX sprites, one for shot and one for bounce
        this.shotFX = this.scene.sound.addAudioSprite('bullet');
        this.shotFX.play('shot1');
        this.bounceFX = this.scene.sound.addAudioSprite('bullet');
        this.wallCollider = this.scene.physics.add.collider( this, this.scene.mapManager.walls, ()=>{
            this.bounceFX.play('bounce1') 
        }, undefined, this);
        this.targetCollider = this.scene.physics.add.collider(this, this.scene.mapManager.targets, this.hitTarget);
        this.enemyCollider = this.scene.physics.add.collider(this, this.scene.mapManager.enemies, Interact.DamageCollision)

        //destory the bullet after a time
        this.scene.time.delayedCall(1000,this.destroy, [], this);
    }

    /**
     * Description
     * @param {Phaser.GameObject} bullet
     * @param {Phaser.GameObject} target
     */
    hitTarget(bullet, target) {
        if(bullet) {
            bullet.bounceFX.play('bounce1');
            bullet.destroy();
        }
        if(target) {
            target.hit(bullet);
        }
    }
    dealDamage() {
        this.bounceFX.play('bounce1');
        this.destroy();
        // this.enemyCollider.destroy();
        // this.scene.time.delayedCall(1000, ()=>{
        //     this.bounceFX.destroy();
        //     this.shotFX.destroy();
        // },[],this)
    }
    /**
     * override to destroy sfx also
     * 
     * guess this wasn't needed?
     */
    destroyWithFX() {
        //destroy the fx sprites a little later so sounds can complete
        let shot = this.shotFX;
        let bounce = this.bounceFX;
        // this.scene.time.delayedCall(1000, (shotfx, bouncefx)=> { 
        //     if(shotfx) {
        //         shotfx.destroy();
        //     }
        //     if(bouncefx) {
        //         bouncefx.destroy();
        //     }
        // },[shot, bounce]);
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