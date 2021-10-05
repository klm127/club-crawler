import Phaser from "phaser";

const GameCoin = require('../../src/objects/items/coin');

/** 
 * @classdesc
 * 
 * A cylinder object that can be destroyed and make some coins... collides with player and walls and other cylinders
 * 
 * This class will eventually be removed or re-done. It was just a pre-cursor to making enemies
 * @deprecated
 */
class Target extends Phaser.GameObjects.Image {



    /**
     * Description
     * @param {any} config
     */
    constructor(config) {
        super(config.scene, config.x, config.y, 'cylinder');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.scene.time.delayedCall(100, ()=> {
            this.body.setDrag(1000,1000);
        },[], this);
        this.health = 25;
        this.velocityIncrement = 500;
        this.nextMoveEvent = null;
        Target.moveTargetRandomlyContinously(this);
    }
    /**
     * Called by bullet when it's struck
     * 
     * Takes down damage
     * @param {ClubCrawler.Objects.Bullet} bullet
     */
    hit(bullet) {
        this.health -= bullet.damage;
        if(this.health <= 0) {
            for(let i = 0; i < Math.random() * 5; i++) {
                let coin = new GameCoin({scene:this.scene}, {x:this.x, y:this.y});
                coin.body.setVelocityX(Math.random() * 100 - 50);
                coin.body.setVelocityY(Math.random() * 100 - 50);

            }
            // destroys move event before it dies!
            if(this.nextMoveEvent) {
                this.nextMoveEvent.destroy();
            }
            this.destroy();
        }
    }
    /**
     * moves target randomly after a random interval
     */
    static moveTargetRandomlyContinously(target) {
        let timeInterval = Math.floor(Math.random() * 3000);
        if(target) {
            target.moveRandomly();
            target.nextMoveEvent = target.scene.time.delayedCall(timeInterval, Target.moveTargetRandomlyContinously, [target])
        }

    }
    /**
     * moves target moves target a random direction
     * @returns {any}
     */
    moveRandomly() {
        let index = Math.floor(Math.random() * 4);
        this.move(index); 
    }
    /**
     * Pushes the target based on its velocity 
     * @param {any} direction
     * @returns {any}
     */
    move(direction) {
        if(this) {
            if(direction == 0) { // right
                this.body.setVelocityX(this.body.velocity.x + this.velocityIncrement);
            }
            else if(direction == 1) { // left
                this.body.setVelocityX(this.body.velocity.x - this.velocityIncrement);
            }
            else if(direction == 2) { // up
                this.body.setVelocityY(this.body.velocity.y + this.velocityIncrement);
            }
            else { //down
                this.body.setVelocityY(this.body.velocity.y - this.velocityIncrement);
            }
        }
    }
}

module.exports = Target;