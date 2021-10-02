import Phaser from "phaser";

const GameCoin = require('./coin');

class Target extends Phaser.GameObjects.Image {

    /**
     * Description
     * @param {Phaser.Scene} scene
     */
    static preload(scene) {
        console.log('preload target');
        scene.load.image('cylinder', 'images/cylinder.png');
        console.log('target preloaded');
    }

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
    hit(bullet) {
        this.health -= bullet.damage;
        if(this.health <= 0) {
            for(let i = 0; i < Math.random() * 5; i++) {
                let coin = new GameCoin({scene:this.scene}, {x:this.x, y:this.y});
                coin.body.setVelocityX(Math.random() * 100 - 50);
                coin.body.setVelocityY(Math.random() * 100 - 50);

            }
            if(this.nextMoveEvent) {
                this.nextMoveEvent.destroy();
            }
            this.destroy();
        }
    }
    static moveTargetRandomlyContinously(target) {
        let timeInterval = Math.floor(Math.random() * 3000);
        if(target) {
            target.moveRandomly();
            target.nextMoveEvent = target.scene.time.delayedCall(timeInterval, Target.moveTargetRandomlyContinously, [target])
        }

    }
    moveRandomly() {
        let index = Math.floor(Math.random() * 4);
        this.move(index); 
    }
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