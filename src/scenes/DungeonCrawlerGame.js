import Phaser from "phaser";

const Player = require('../objects/player')
const DungeonMapManager = require('../objects/map');
const Bullet = require('../objects/bullet')

/** 
 * @classdesc
 * The main game containing the mapmanager, player, and input detection
 * @memberof ClubCrawler.Scenes
 * @extends Phaser.Scene
 * @see {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Scene Phaser.Scene}
 */
class DungeonCrawlerGame extends Phaser.Scene  
{
    /**
     * Preloads assets
     * 
     * @extends Phaser.Scene.preload
     */
    preload() {
        Player.preload({scene: this});
        DungeonMapManager.preload({scene:this, mapName:'blueworld'});
    }

    /**
     * Creates game items needed.
     * 
     * @extends Phaser.Scene.create
     */
    create() {
        /**
         * The map manager
         * @type {ClubCrawler.Objects.DungeonMapManager}
         */
        this.mapManager = new DungeonMapManager({scene: this, map: 'blueworld'});
        /**
         * The player
         * @type {ClubCrawler.Objects.Player}
         */
        this.player = new Player({scene:this, x:200, y: 200, scale:0.5, maxSpeed: 540, drag:1000, velocityIncrement: 55}); 


        // camera follows player
        this.cameras.main.startFollow(this.player, true);

        //place the player
        this.mapManager.startPlayer(this.player);

        //draw the map objects
        this.mapManager.placeMapObjects();

        //launch the overlay 
        this.scene.launch('crawleroverlay');

        //set up input event listening
        /**
         * Listeners for arrow keys, space, and shift
         * 
         * @see {@link https://newdocs.phaser.io/docs/3.55.1/Phaser.Types.Input.Keyboard.CursorKeys Phaser.Types.Input.Keyboard.CursorKeys}
         * 
         * @type {Phaser.Types.Input.Keyboard.CursorKeys}
         */
        this.cursors = this.input.keyboard.createCursorKeys();

        //click to shoot
        this.input.on('pointerdown', ()=> {
            Bullet.makeBullet(this.player);
        }, this);

    }
    /**
     * Updates items as needed. Checks for keyboard input.
     * 
     * @param {number} time - total elapsed time
     * @param {number} delta - change in time since last update
     */
    update(time, delta) {
        if(this.cursors.left.isDown) {
            this.player.move('w');
        }
        if(this.cursors.right.isDown) {
            this.player.move('e');
        }
        if(this.cursors.down.isDown) {
            this.player.move('s');
        }
        if(this.cursors.up.isDown) {
            this.player.move('n');
        }
        this.player.reticle.update();
    }

}

module.exports = DungeonCrawlerGame;