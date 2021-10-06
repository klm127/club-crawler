import Phaser from "phaser";
//const Bullet = require('./bullet');
const Interact = require('../../interfaces/interact');
const dataManager = require('../data');

/**
 * @memberof ClubCrawler.Objects.Weapon
 */
const DEFAULT_WEAPON = {
    name: "popper",
    duration: 1000,
    projectileVelocity: 1000,
    spin: 2000,
    mass: 0.1,
    damage: 12,
    fireRate: 300,
    spriteKey: "bullet",
    audioSpriteKey: "bullet-sound",
    audioFireKey: "shot1",
    audioBounceKey: "bounce1",
    audioHitKey: "bounce1",
    bounce: 0.3,
    hitEnemies: true,
    hitWalls: true,
    hitDestructibles: true,
    destroyOnWallTouch: false,
}

/**
 * @memberof ClubCrawler.Objects
 * 
 * @classdesc Controls weapon class
 * 
 * Basically a bullet factory
 */
class Weapon {
    constructor(config) {
        Object.assign(this, DEFAULT_WEAPON);
        Object.assign(this, config);
        this.scene = config.scene;
        this.wielder = config.wielder;
        this.target = config.target;
        this.lastTimeFired = 0;
    }
    /**
     * Description
     * @param {Object} newTarget - the game object to target (must have x and y)
     */
    setTarget(newTarget) {
        this.target = newTarget;
    }
    fire(time) {
        if(time > this.lastTimeFired + this.fireRate) {
            let newBullet = new Projectile(this);
            this.lastTimeFired = time;
        }
    }
}

/** 
 * @memberof ClubCrawler.Objects.Weapon
 * 
 * @classdesc A projectile, created by a Weapon
 */
class Projectile extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.wielder.x, config.wielder.y, config.spriteKey);

        //set props from config
        this.config = config;
        this.damage = config.damage;
        this.duration = config.duration;
        this.audioSpriteKey = config.audioSpriteKey;
        this.audioBounceKey = config.audioBounceKey; 
        this.audioFireKey = config.audioFireKey; 
        this.audioHitKey = config.audioHitKey; 
        this.projectileVelocity = config.projectileVelocity;
        this.destroyOnWallTouch = config.destroyOnWallTouch;


        //set physics object from config
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.setAngularVelocity(config.spin);
        this.body.setBounce(config.bounce, config.bounce);
        this.body.setMass(config.mass);

        //create audiosprites
        this.shotFX = this.scene.sound.addAudioSprite(config.audioSpriteKey);
        this.bounceFX = this.scene.sound.addAudioSprite(config.audioSpriteKey);
        this.hitFX = this.scene.sound.addAudioSprite(config.audioSpriteKey);

        //create colliders
        if(config.hitWalls) {
            this.scene.physics.add.collider(this, this.scene.mapManager.walls, this.hitWall, null, this);
        }
        if(config.hitEnemies) {
            this.scene.physics.add.collider(this, this.scene.mapManager.enemies, Interact.DamageCollisionReversed);
        }
        if(config.hitDestructibles) {
            this.scene.physics.add.collider(this, this.scene.mapManager.destructibles, Interact.DamageCollisionReversed);
        }
        this.scene.time.delayedCall(this.duration, this.destroy, [], this);
        this.fireAt(config.target)
    }
    /**
     * Gives bullet velocity towards target
     * 
     * @param {Object} target with an x and y
     */
    fireAt(target) {
        let hypoteneuse = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);

        let adjacent = target.x - this.x;
        let opposite = target.y - this.y;
        let sine = opposite/hypoteneuse;
        let cosine = adjacent/hypoteneuse;

        let speedX = this.projectileVelocity * cosine;
        let speedY = this.projectileVelocity * sine; 


        this.body.setVelocityX(speedX);
        this.body.setVelocityY(speedY);
        if(this.shotFX) {
            this.shotFX.play(this.audioFireKey);

        }
    }
    /**
     * Called by Interfaces.Interact when damage is dealt
     */
    dealDamage() {
        if(this.hitFX) {
            this.hitFX.play(this.audioHitKey);
        }
        if(dataManager.debug.weapon.sound == true) {
            let hasSound = false;
            if(this.hitFX) {
                hasSound = true;
            }
            dataManager.log('hit enemy - is there sfx?' + hasSound);
        }
        this.destroy();
    }
    /**
     * Called when wall collide occurs
     */
    hitWall() {
        if(dataManager.debug.weapon.sound) {
            let hasSound = false;
            if(this.bounceFX) {
                hasSound = true;
            }
            dataManager.log('bounce bullet-sfx? ' + hasSound);
        }
        if(this.bounceFX) {
            this.bounceFX.play(this.audioBounceKey);
        }
        if(this.destroyOnWallTouch) {
            this.destroy();
        }
    }
}

module.exports = Weapon;