import Phaser from "phaser";
import {dataManager} from "./data";



export default class GameCoin extends Phaser.GameObjects.Image {

    /**
     * uses the "coin" key
     * 
     * @param {Phaser.Scene} scene - Game scene preloading
     */
    static preload(scene) {
        scene.load.image('coin', "images/coin.png");
    }

    /**
     * Creates a coin object on the map using phaser
     * @param {any} config - must have config.scene
     * @param {any} item - must have item.value, item.x, item.y
     */
    constructor(config, item) {

        super(config.scene, item.x, item.y, 'coin');


        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(0.5, 0.5);

        if(config.player) {
            this.scene.physics.add.overlap(config.player, this, this.overlapWithPlayer);
        }

        this.spinrate = config.spinrate ? config.spinrate : 4000;
        this.spinning = false;
        this.coinValue = item.value ? item.value : 1;
        this.body.setMass(config.mass ? config.mass : 0.05);


    }
    /**
     * @param {} player - The player
     * @param {GameCoin} coin - The coin 
     */
    overlapWithPlayer(player, coin) {
        if(!coin.spinning) {
            dataManager.changeScore(coin.coinValue);
            coin.spinning = true;
            coin.body.setAngularVelocity(coin.spinrate);
            coin.body.setVelocityX(Math.random() * 100 - 50);
            coin.body.setVelocityY(Math.random() * 100 - 50);
            coin.scene.time.delayedCall(500,coin.fadeCoin, [], coin);
        
        }
    }

    fadeCoin() {
        this.scene.tweens.add({
            getStart: 1,
            getEnd: 0,
            targets:this,
            duration: 1000,
            delay: 0,
            ease: 'Linear',
            onUpdate: function(tween, target) { 
                target.setScale(1-tween.totalProgress, 1-tween.totalProgress)
            },
            
            onComplete: function(tween, targets) {
                targets[0].destroy();
            }
        })
    }

}