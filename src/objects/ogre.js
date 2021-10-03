import Phaser from "phaser";

const Movement = require('../interfaces/movement');
const GameCoin = require('./coin');
const Sense = require('../interfaces/sense');
const dataManager = require('./data');

/**
 * Default characteristics for the ogre - health, speed, damage, coin result, etc
 * 
 * @static
 * @final
 * @memberof ClubCrawler.Objects.Ogre
 */
const DEFAULT_OGRE_STATS = {
    health: 25,
    speed: 100, // might be redundant with velocity increment being the more relevant one
    maxSpeed: 500,
    updateSpeed: 1000,
    velocityIncrement: 400,
    mass: 5,
    drag: 50,
    maxCoins: 10,
    minCoins: 5,
    senseRange: 800,
    damage: 5,
    sfxVolume: 0.1,
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
     * Load atlas as, key 'ogre'
     * @param {Phaser.Scene} scene
     */
    static preload(scene) {
        scene.load.audioSprite('ogre-sound', 'sounds/ogre.json', 'sounds/ogre.mp3');
        scene.load.atlas({
            key:'ogre', 
            textureURL: 'images/ogre.png', 
            atlasURL: 'images/ogre.json' 
        });
    }

    /**
     * Constructs the ogre
     * @param {Object} config - The configuration object // Create CreatureConfig
     * @param {Phaser.Scene} config.scene - The creating scene
     * @param {Item} config.item - The Tiled item having the x,y etc
     */
    constructor(config) {

        //call super
        super(config.scene, config.x, config.y, "ogre", "still.png");
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        Object.assign(this, DEFAULT_OGRE_STATS);
        Object.assign(this, config);
        this.setScale(0.75, 0.75);
        this.sfx = this.scene.sound.addAudioSprite('ogre-sound');
        this.sfx.volume = (this.sfxVolume);
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
     * Called by collision function. Can react to damage here.
     * 
     * @param {number} damage - amount of damage taken
     */
    takeDamage(damage) { 
        let ogre = this;
        ogre.health -= damage;
        this.sfx.play('takedamage');
        // if(ogre.health > 0) {
        //     this.scene.tweens.addCounter({
        //         from: 0,
        //         to: 20,
        //         yoyo:true,
        //         duration: 100,
        //         onUpdate: function(tween) {
        //             //console.log(tween);
        //             if(ogre) {
        //                 ogre.setY(tween.getValue()+ogre.y);
        //             }
        //         }
        //     });
        // }
    }
    /**
     * Called internally if the result of, for example, takeDamage causes it to die
     * 
     * Can clean up any other objects it needs to, like ongoing events, when it dies
     * 
     */
    die() {
        this.sfx.play('die');
        this.scene.time.delayedCall(6000, (sound)=> {sound.destroy()}, [this.sfx]);
        for(let i = this.minCoins; i < Math.random() * this.maxCoins + this.minCoins; i++) {
            let coin = new GameCoin({scene:this.scene}, {x:this.x, y:this.y});
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
            Movement.MoveTowardsPlayer(this, {});
        } else {
            Movement.MoveRandomly(this, {speedRatio:0.5});
        }
        if(sensation.distance < this.senseRange/2) {
            if(!this.hasSensedPlayer) { 
                this.hasSensedPlayer = true;
                this.sfx.play("shout");
            }
            this.setFrame("attack.png")
        } else {
            this.hasSensedPlayer = false;
            this.setFrame("still.png");
        }
    }

}


module.exports = Ogre