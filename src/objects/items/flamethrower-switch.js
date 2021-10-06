/**
 * 
 * Switches a players weapon to the flamethrower when stepped on
 * 
 * Appears as a flamethrower
 */

import Phaser from "phaser";


class FlameThrowerSwitch extends Phaser.GameObjects.Image {
        /**
     * @param {Object} config - GameItemConfig
     */
         constructor(config) {

            super(config.scene, config.x, config.y, 'coin');
    
    
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
            this.coinValue = config.value ? config.value : config.tiledData ? config.tiledData.value : 1;
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

}