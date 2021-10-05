import Phaser from "phaser";

const Movement = require('../../interfaces/movement');
const GameCoin = require('../items/coin');
const dataManager = require('../data');

/**
 * Default characteristics for the ogre - health, speed, damage, coin result, etc
 * 
 * Not actually implemented yet (target is still being used) - need to improve mapmanager
 * 
 * @static
 * @final
 * @memberof ClubCrawler.Objects.Destructibles.Cylinder
 */
const DEFAULT_CYLINDER_STATS = {
    name: "Cylinder",
    health: 15,
    speed: 100, // might be redundant with velocity increment being the more relevant one
    maxSpeed: 500,
    updateSpeed: 500,
    velocityIncrement: 450,
    mass: 2,
    drag: 800,
    maxCoins: 2,
    minCoins: 1,
    damage: 0,
    spriteKey: "cylinder",
}

/** 
 * @classdesc 
 * A class for an Cylinder that moves around.
 * 
 * @memberof ClubCrawler.Objects
 * @extends Phaser.GameObjects.Image
*/
class Cylinder extends Phaser.GameObjects.Image {
    

    /**
     * Constructs the cylinder
     * @param {Object} config - The configuration object // Create CreatureConfig
     * @param {Phaser.Scene} config.scene - The creating scene
     * @param {Item} config.item - The Tiled item having the x,y etc
     */
    constructor(config) {
        if(dataManager.debug.on && dataManager.debug.destructibles.cylinder) {
            dataManager.log('Cylinder constructor called');
            dataManager.log(`config for cylinder: ${Object.keys(config)}`);
            dataManager.log(`tiled data available: ${Object.keys(config.tiledData)}`)
        }

        //call super
        super(config.scene, config.x, config.y, config.spriteKey ? config.spriteKey : DEFAULT_CYLINDER_STATS.spriteKey);
        config.scene.add.existing(this);
        config.scene.physics.add.existing(this);
        Object.assign(this, DEFAULT_CYLINDER_STATS);
        Object.assign(this, config);
        
        this.scene.time.delayedCall(100, ()=> {
            this.body.setMaxSpeed(this.maxSpeed);
            this.body.setMass(this.mass);
            this.body.setDrag(this.drag);
            Movement.MoveRandomlyRepeat(this, {
                repeatTime: Phaser.Math.RND.integerInRange(this.updateSpeed-25, this.updateSpeed+25)
            });

        },[], this);
    }
    /**
     * Called by collision function. Can react to damage here.
     * 
     * @param {number} damage - amount of damage taken
     */
    takeDamage(damage) { 
        let cylinder = this;
        cylinder.health -= damage;
    }
    /**
     * Called internally if the result of, for example, takeDamage causes it to die
     * 
     * Can clean up any other objects it needs to, like ongoing events, when it dies
     * 
     */
    die() {
        for(let i = this.minCoins; i < Math.random() * this.maxCoins + this.minCoins; i++) {
            let coin = new GameCoin({scene:this.scene, x:this.x, y:this.y});
            coin.body.setVelocityX(Math.random() * 100 - 50);
            coin.body.setVelocityY(Math.random() * 100 - 50);
        }
        if(this.nextMoveEvent) {
            this.nextMoveEvent.destroy();
        }
        dataManager.emitter.emit("destructibleDied");
        this.destroy();
    }
}


module.exports = Cylinder;