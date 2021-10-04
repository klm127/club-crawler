import Phaser from "phaser";

const Player = require('../objects/player')
const DungeonMapManager = require('../objects/map');
const Bullet = require('../objects/bullet')
const dataManager = require('../objects/data');
const Load = require('../utility/load');

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
        Load.blueworld(this);
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
        
        //listen for win condition
        dataManager.emitter.on("enemyDied", ()=> {
            let remainingEnemies = this.scene.scene.mapManager.enemies.children.entries.length;
            if(remainingEnemies <= 0) {
                this.scene.scene.win();
            }

        });

        //set up input event listening
        /**
         * Listeners for arrow keys, space, and shift
         * 
         * @see {@link https://newdocs.phaser.io/docs/3.55.1/Phaser.Types.Input.Keyboard.CursorKeys Phaser.Types.Input.Keyboard.CursorKeys}
         * 
         * @type {Phaser.Types.Input.Keyboard.CursorKeys}
         */
        this.cursors = this.input.keyboard.createCursorKeys();

        this.pointerDown = false;

        //click to shoot
        this.input.on('pointerdown', ()=> {
            this.pointerDown = true;
        }, this);
        this.input.on('pointerup', ()=> {
            this.pointerDown = false;
        },this)

    }
    win() {
        dataManager.changeScore(100);
        this.scene.stop(this);
        this.scene.start('gamewin');

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
        if(this.pointerDown) {
            this.player.weapon.fire(time);
        }
    }

}

module.exports = DungeonCrawlerGame;