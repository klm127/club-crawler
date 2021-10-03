import Phaser from "phaser";

const Movement = require('../interfaces/movement');
const GameCoin = require('./coin');
const Sense = require('../interfaces/sense');

const DEFAULT_OGRE_STATS = {
    health: 300,
    speed: 100, // might be redundant with velocity increment being the more relevant one
    maxSpeed: 500,
    updateSpeed: 1000,
    velocityIncrement: 500,
    mass: 5,
    drag: 50,
    maxCoins: 10,
    minCoins: 5,
    senseRange: 800,
    damage: 30,
    weapon: null, // implement
}

/** 
 * @classdesc 
 * A class for an Ogre enemy. Uses an atlas w two sprite animations
 * 
 * @memberof ClubCrawler.Objects
 * @extends Phaser.GameObjects.Image
*/
class Ogre extends Phaser.GameObjects.Image {
    
    static preload(scene) {
        scene.load.atlas({
            key:'ogre', 
            textureURL: 'images/ogre.png', 
            atlasURL: 'images/ogre.json' 
        });
    }

    /**
     * Constructs the ogre
     * @param {Object} config - The configuration object
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
        
        this.scene.time.delayedCall(100, ()=> {
            this.body.setMaxSpeed(this.maxSpeed);
            this.body.setMass(this.mass);
            this.body.setDrag(this.drag);
            Sense.SensePlayerRepeat(this, {});

        },[], this);
    }

    hit(bullet) {
        this.health -= bullet.damage;6
        if(this.health <= 0) {
            this.die();
        }
    }
    takeDamage() {
        let ogre = this;
        this.scene.tweens.addCounter({
            from: 0,
            to: 20,
            yoyo:true,
            duration: 100,
            onUpdate: function(tween) {
                console.log(tween);
                ogre.setAngle(tween.getValue());
            }
        });
    }
    die() {
        this.setRotation(1.5);
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
            this.setFrame("attack.png")
        } else {
            this.setFrame("still.png");
        }
    }

}


module.exports = Ogre