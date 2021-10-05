import Phaser from "phaser";

const Movement = require('../../interfaces/movement');
const GameCoin = require('../items/coin');
const Sense = require('../../interfaces/sense');
const dataManager = require('../data');

/**
 * Default characteristics for the ogre - health, speed, damage, coin result, etc
 * gamescenepassthrough.constructor.name
 * @static
 * @final
 * @memberof ClubCrawler.Objects.Ogre
 */
const DEFAULT_OGRE_STATS = {
    health: 150,
    speed: 100, // might be redundant with velocity increment being the more relevant one
    maxSpeed: 500,
    updateSpeed: 500,
    velocityIncrement: 400,
    mass: 5,
    drag: 50,
    maxCoins: 10,
    minCoins: 5,
    senseRange: 800,
    damage: 5,
    sfxVolume: 0.1, // not sure why i can't get this to work to turn down the volume on the ogre fx
    spriteKey: "ogre",
    spriteAttackFrame: "attack.png", // not implemented yet
    spriteStillFrame: "still.png", // not implemented yet
    audioSpriteKey: "ogre-sound",
    weapon: null, // implement
}

/** 
 * @classdesc 
 * A class for an Ogre enemy. Uses an atlas w sprite animations
 * 
 * @memberof ClubCrawler.Objects
 * @extends Phaser.GameObjects.Image
*/
class Ogre extends Phaser.GameObjects.Image {
    

    /**
     * Constructs the ogre
     * @param {Object} config - The configuration object // Create CreatureConfig
     * @param {Phaser.Scene} config.scene - The creating scene
     * @param {Item} config.item - The Tiled item having the x,y etc
     */
    constructor(config) {

        //call super
        super(config.scene, config.x, config.y, config.spriteKey ? config.spriteKey : DEFAULT_OGRE_STATS.spriteKey, config.spriteStillFrame ? config.spriteStillFrame : DEFAULT_OGRE_STATS.spriteStillFrame);
        this.name = "Ogre";
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        Object.assign(this, DEFAULT_OGRE_STATS);
        Object.assign(this, config);
        this.setScale(0.75, 0.75);
        this.dealDamageSfx = this.scene.sound.addAudioSprite(this.audioSpriteKey);
        this.dealDamageSfx.volume = this.sfxVolume;
        this.takeDamageSfx = this.scene.sound.addAudioSprite(this.audioSpriteKey);
        this.takeDamageSfx.volume = this.sfxVolume;
        this.shoutSfx = this.scene.sound.addAudioSprite(this.audioSpriteKey);
        this.shoutSfx.volume = this.sfxVolume;
        this.dieSfx = this.scene.sound.addAudioSprite(this.audioSpriteKey);
        this.dieSfx.volume = this.sfxVolume;
        this.hasSensedPlayer = false;
        
        this.scene.time.delayedCall(100, ()=> {
            this.body.setMaxSpeed(this.maxSpeed);
            this.body.setMass(this.mass);
            this.body.setDrag(this.drag);
            Sense.SensePlayerRepeat(this, {});

        },[], this);
    }

    /**
     * @deprecated
     * old bullet interaction
     * @param {any} bullet
     * @returns {any}
     */
    hit(bullet) {
        this.health -= bullet.damage;
        if(this.health <= 0) {
            this.die();
        } else {
            //this.sfx.play('takedamage');
        }
    }
    /**
     * Plays damage sound
     */
    dealDamage() {
        this.dealDamageSfx.play('dealdamage');
    }
    /**
     * Called by collision function. Can react to damage here.
     * 
     * @param {number} damage - amount of damage taken
     */
    takeDamage(damage) { 
        let ogre = this;
        ogre.health -= damage;
        this.takeDamageSfx.play('takedamage');
    }
    /**
     * Called internally if the result of, for example, takeDamage causes it to die
     * 
     * Can clean up any other objects it needs to, like ongoing events, when it dies
     * 
     */
    die() {
        this.dieSfx.play('die');
        this.scene.time.delayedCall(6000, (sounds)=> {
            sounds.forEach( (sound) => {
                sound.destroy();
            })
        }, [[this.dieSfx, this.takeDamageSfx, this.dealDamageSfx, this.shoutSfx]]);
        for(let i = this.minCoins; i < Math.random() * this.maxCoins + this.minCoins; i++) {
            let coin = new GameCoin({scene:this.scene, x:this.x, y:this.y});
            coin.body.setVelocityX(Math.random() * 100 - 50);
            coin.body.setVelocityY(Math.random() * 100 - 50);
        }
        if(this.nextMoveEvent) {
            this.nextMoveEvent.destroy();
        }
        if(this.senseEvents) {
            this.senseEvents.forEach( (event)=> {
                event.destroy();
            });
        }
        dataManager.emitter.emit("enemyDied");
        this.destroy();
    }
    /**
     * Called by the repeating sense event. In case of Ogre, the senseevent is detecting player distance. This function is basically the entirety of the Ogre AI
     * @param {ClubCrawler.Types.SensationConfig} sensation
     */
    sense(sensation) {
        if(this.body.velocity.x > 0) {
            this.setFlipX(true);
        } else {
            this.setFlipX(false);
        }
        if(sensation.distance < this.senseRange) {
            if(!this.hasSensedPlayer || !this.shoutSfx.isPlaying) { 
                this.hasSensedPlayer = true;
                this.shoutSfx.play("shout");
            }
            Movement.MoveTowardsPlayer(this, {});
        } else {
            Movement.MoveRandomly(this, {speedRatio:0.5});
        }
        if(sensation.distance < this.senseRange/3*2) {
            this.setFrame("attack.png")
        } else {
            this.hasSensedPlayer = false;
            this.setFrame("still.png");
        }
    }

}


module.exports = Ogre