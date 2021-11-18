import Phaser from "phaser";

/**
 * @memberof ClubCrawler.Data
 * 
 * @property {number} score - The game score. Displayed on the overlay.
 * @property {Phaser.Events.EventEmitter} emitter - The global {@link https://newdocs.phaser.io/docs/3.52.0/Phaser.Events.EventEmitter Phaser.Events.EventEmitter} instance for cross scene and global communication.
 * @property {ClubCrawler.Types.SettingsConfig} - The game settings object.
 * @property {number} sfxVolume - The sound effect volume (not currently working)
 * @property {number} musicVolume - The music volume (not currently working)
 * @property {ClubCrawler.Types.DebugConfig} debug - Debug settings.
 * @property {function} changeScore - Called to change player score.
 * @property {function} changeHealth - Called to change player health.
 * @property {function} log - Called to log debug data if debug is active.
 * @property {ClubCrawler.DOMUserInterface.DOMUIManager} uiManager - The user interface manager
 */
const dataManager = {
    score: 0,
    emitter: new Phaser.Events.EventEmitter(),
    uiManager: null, // added main
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
        emitter: new Phaser.Events.EventEmitter(),
        debugLines: ['debug'],
        on: false,
        duration: 3000, //how long a message stays on the screen,
        max: 10, //how many messages can appear
        weapon: {
            sound: false,
        },
        items: {
            overlap: true,
            pickup: true
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
            objects: false,
        },
        player: {
            construction: false,
            inventory: false,
        }
    },
    debugLines: ['debug'],
    changeScore: function(change) {
        dataManager.score += change;
        dataManager.emitter.emit('scoreChange');
        return dataManager.score;
    }, 
    changeHealth: function(change) {
        dataManager.health += change;
        dataManager.emitter.emit('healthChange');
    },
    log: function(newText) {
        if(dataManager.debug.on) {
            dataManager.debug.debugLines.push(newText);
            dataManager.debug.emitter.emit('debugLog');
        }
    }
    
};


module.exports = dataManager;