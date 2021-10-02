import Phaser from "phaser";

const dataManager = require('./data');
const Player = require('./player');

/** 
 * @classdesc
 * A class for representing a Coin object, which increases the player score.
 * 
 * Renders sprite based on images/coin.png. Created by {@link ClubCrawler.Objects.DungeonMapManager} for each Object in the Map Layer of type "points".
 * 
 * When a player overlaps a coin, it increases dataManager.score, begins spinning and moving in a random direction, then scales down to 0 and is destroyed. 
 * @memberof ClubCrawler.Objects
 * @extends {Phaser.GameObjects.Image} 
 * @see {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.GameObjects.Image Phaser.GameObjects.Image}
 */
class GameCoin extends Phaser.GameObjects.Image {

    /**
     * Preloads image. Called by DungeonMapManager.preload.
     * 
     * Reserves the "coin" key in the scene images.
     * 
     * @static
     * @param {Phaser.Scene} scene - Game scene preloading
     */
    static preload(scene) {
        scene.load.image('coin', "images/coin.png");
        scene.load.audioSprite('gamecoin', 'sounds/gamecoin.json', 'sounds/gamecoin.mp3');
    }

    /**
     * @param {Object} config - Configuration
     * @param {Phaser.Scene} config.scene - The {@link https://newdocs.phaser.io/docs/3.52.0/Phaser.Scene Phaser.Scene} where this is drawn
     * @param {ClubCrawler.Objects.Player} config.player - The player which can trigger the coin
     * @param {number} [config.spinrate=4000] - The angular velocity to apply when the coin is touched
     * @param {Phaser.Types.Tilemaps.TiledObject} item - item structured by Tiled as per {@link https://newdocs.phaser.io/docs/3.52.0/Phaser.Tilemaps.TiledObject Phaser.Types.Tilemaps.TiledObject}
     * @param {number} [item.properties.value=1] - The value of the coin as set in Tiled custom properties
     */
    constructor(config, item) {

        super(config.scene, item.x, item.y, 'coin');


        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setOrigin(0.5, 0.5);

        if(config.player) {
            this.scene.physics.add.overlap(config.player, this, this.overlapWithPlayer);
        } else if(config.scene) {
            this.scene.physics.add.overlap(config.scene.player, this, this.overlapWithPlayer);
        }

        this.scene.physics.add.collider(this, this.scene.mapManager.walls);


        this.spinrate = config.spinrate ? config.spinrate : 4000;
        /**
         * Whether the coin has already been triggered
         * @default false
         * @type {boolean}
         */
        this.spinning = false;
        /**
         * The value of the coin
         * @default 1
         * @type {number}
         */
        this.coinValue = item.value ? item.value : 1;
        this.body.setMass(config.mass ? config.mass : 0.05);
        this.body.setDrag(10,10);
        this.sfx = this.scene.sound.addAudioSprite('gamecoin');


    }
    /**
     * Callback function applied when player touches the coin. Increases the score and begins spinning the coin.
     * 
     * @param {ClubCrawler.Objects.Player} player - The player
     * @param {ClubCrawler.Objects.GameCoin} coin - The coin 
     */
    overlapWithPlayer(player, coin) {
        if(!coin.spinning) {
            coin.sfx.play('ding');
            dataManager.changeScore(coin.coinValue);
            coin.spinning = true;
            coin.body.setAngularVelocity(coin.spinrate);
            coin.body.setVelocityX(Math.random() * 100 - 50);
            coin.body.setVelocityY(Math.random() * 100 - 50);
            coin.scene.time.delayedCall(500,coin.fadeCoin, [], coin);
        
        }
    }

    /**
     * The fade out function for the coin. 'This' scope is the Coin, as applied by {@link https://newdocs.phaser.io/docs/3.55.1/Phaser.Time.Clock#delayedCall scene.time.delayedCall}. Callback triggered on a timer after spinning starts. Shrinks coin and deletes it after it shrinks to nothing.
     */
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
                targets[0].sfx.destroy();
                targets[0].destroy();
            }
        })
    }

}

module.exports = GameCoin;