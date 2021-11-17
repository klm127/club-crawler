import Phaser from "phaser";

const emitter = new Phaser.Events.EventEmitter()

/**
 * @memberof ClubCrawler.Data
 * 
 * @property {number} score - The game score. Displayed on the overlay.
 * @property {number} health - The player health. Todo: Display on the overlay.
 * @property {Phaser.Events.EventEmitter} emitter - The global {@link https://newdocs.phaser.io/docs/3.52.0/Phaser.Events.EventEmitter Phaser.Events.EventEmitter} instance for cross scene and global communication.
 * @property {number} sfxVolume - The sound effect volume (not currently working)
 * @property {number} musicVolume - The music volume (not currently working)
 * @property {ClubCrawler.Types.DebugConfig} debug - An object controlling what debug messages are displaying on the {@link ClubCrawler.Scenes.DebugOverlay}
 * @property {Array} debugLines - The currently visible debug lines
 * @property {function} changeScore - Called to change player score
 * @property {function} changeHealth - Called to change player health
 * @property {function} log - Called to log debug data if debug is active
 */
const dataManager = {
    score: 0,
    health: 0,
    emitter: emitter,
    settings: {
        sound: {
            sfxVol: {
                name: "Sound Effects Volume",
                type: "number",
                value: 1,
                min: 0,
                max: 2,
                increment: 0.1
            },
            musicVol: {
                name: "Music Volume",
                type: "number",
                value: 0.5,
                min: 0,
                max: 2,
                increment: 0.1
            }
        }
    },
    debug: {
        debugLines: ['debug'],
        on: false,
        duration: 3000, //how long a message stays on the screen,
        max: 10, //how many messages can appear
        weapon: {
            sound: false,
        },
        items: {
            overlap: true
        },
        enemies: {
            die: true
        },
        destructibles: {
            cylinder: false,
            colliders: false
        },
        logic: {
            win: false
        },
        map: {
            placePlayer: false,
            layers: false,
            functions: false,
        },
        player: {
            construction: false
        }
    },
    debugLines: ['debug'],
    /**
     * Changes the score and emits the 'scoreChange' event.
     * @param {number} change - The amount to change the score by.
     * @returns {number} - The data manager score
     */
    changeScore: function(change) {
        dataManager.score += change;
        emitter.emit('scoreChange');
        return dataManager.score;
    }, 
    changeHealth: function(change) {
        dataManager.health += change;
        emitter.emit('healthChange');
    },
    log: function(newText) {
        if(dataManager.debug.on) {
            dataManager.debugLines.push(newText);
            emitter.emit('debugChange');
        }
    }
    
};


module.exports = dataManager;