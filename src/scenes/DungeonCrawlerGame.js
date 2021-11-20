import Phaser from "phaser";

const Player = require('../objects/player/player')
const dataManager = require('../objects/data');
const Load = require('../utility/load');
const MapParser = require('../mapParsers/parsers');

const GAME_SETTINGS = {
    validationTime: 3000
}

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
        console.log('game scene', this);
    }

    /**
     * Creates game items needed.
     * 
     * @extends Phaser.Scene.create
     */
    create() {
        /**
         * The map manager
         * @type {ClubCrawler.Parsers.BlueWorldParser}
         */
        this.mapManager = new MapParser.BlueWorld({scene:this, map:'blueworld'});
        // new DungeonMapManager({scene: this, map: 'blueworld'});
        /**
         * The player
         * @type {ClubCrawler.Objects.Player}
         */
        this.player = new Player({scene:this, x:200, y: 200, scale:0.5, maxSpeed: 540, drag:1000, velocityIncrement: 55}); 

        let size = {
            w: this.game.config.width,
            h: this.game.config.height
        }

        //draw the map objects
        this.mapManager.placeMappedObjects();
        this.mapManager.addColliders();

        //place the player
        this.mapManager.startPlayer(this.player);

        //create the minimap
        let minimap = this.cameras.add(size.w/5*4,size.h/5*4, size.h/5, size.h/5,false,'minimap');
        minimap.setZoom(0.05,0.05);
        minimap.startFollow(this.player, true);
        minimap.setAlpha(0.5);
        minimap.ignore(this.mapManager.enemies);

        // main camera follows player
        this.cameras.main.startFollow(this.player, true);
        
        
        var gamescenepassthrough = this;
        //listen for win condition
        dataManager.emitter.on("enemyDied", this.checkWinCondition, this);

        //set up input event listening
        /**
         * Listeners for arrow keys, space, and shift
         * 
         * @see {@link https://newdocs.phaser.io/docs/3.55.1/Phaser.Types.Input.Keyboard.CursorKeys Phaser.Types.Input.Keyboard.CursorKeys}
         * 
         * @type {Phaser.Types.Input.Keyboard.CursorKeys}
         */
        this.cursors = this.input.keyboard.createCursorKeys();
        this.cursors.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.cursors.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.cursors.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.cursors.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);



        console.log(this.cursors)

        this.pointerDown = false;

        //click to shoot
        this.input.on('pointerdown', ()=> {
            this.pointerDown = true;
        }, this);
        this.input.on('pointerup', ()=> {
            this.pointerDown = false;
        },this);

        dataManager.uiManager.initialize(this.player);

        //new Clock(this); // creates this.time

        this.time.addEvent({
            delay: GAME_SETTINGS.validationTime,
            loop: true,
            callback: this.validateGame,
            callbackScope: this
        })

    }
    /**
     * Checks if game is won whenever an enemy dies
     * @listens ClubCrawler.Events.enemyDied
     */
    checkWinCondition() {
        this.time.delayedCall(2000, ()=> {
            let remainingEnemies = this.mapManager.enemies.children.entries.length;
            if(dataManager.debug.on && (dataManager.debug.logic.win || dataManager.debug.enemies.die) ) {
                dataManager.log(`an enemy death event was detected in Scene! remaining ${remainingEnemies}`);
            }
            if(remainingEnemies <= 0) {
                this.win();
            }
        },[], this)
    }

    /**
     * Every few seconds, checks to make sure enemies and player are not out of bounds. If they are, it kills them.
     */
    validateGame() {
        for(let enemy of this.mapManager.enemies.children.entries) {
            if(!this.mapManager.floors.getTileAtWorldXY(enemy.x, enemy.y)) {
                enemy.die();
            }
        }
    }

    /**
     * Called when an enemy died and there are no remaining enemies.
     */
    win() {
        
        if(dataManager.debug.on && dataManager.debug.logic.win) {
            dataManager.log(`Win called in scene`);
        }

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
        if(this.cursors.left.isDown || this.cursors.a.isDown) {
            this.player.move('w');
        }
        if(this.cursors.right.isDown || this.cursors.d.isDown) {
            this.player.move('e');
        }
        if(this.cursors.down.isDown || this.cursors.s.isDown) {
            this.player.move('s');
        }
        if(this.cursors.up.isDown || this.cursors.w.isDown) {
            this.player.move('n');
        }
        this.player.reticle.update();
        if(this.pointerDown) {
            this.player.weapon.fire(time);
        }
    }

}

module.exports = DungeonCrawlerGame;