/**
 * Functions for ais to evaluate the world around them
 * 
 * Like Movement, work by firing events
 * 
 * Objects using senses should define a sense function
 * 
 * @memberof ClubCrawler.Interfaces
 * 
 * @namespace Sense
 * 
 */

import Phaser from "phaser"

/**
 * Validates a SenseConfig Object
 * 
 * @memberof ClubCrawler.Interfaces.Sense
 * @param {Phaser.GameObjects.GameObject} caller - The caller game object
 * @param {ClubCrawler.Types.SenseConfig} config - The sense config
 * @returns {boolean}
 */
function validateSense(caller, config) {
    if(!config) {
        config = {};
    }
    if(!config.scene) {
        if(!caller.scene) {
            console.error('No scene detected while validating sense in', caller);
            return false;
        }
        else {
            config.scene = caller.scene;
        }
    }
    if(!config.player) {
        if(!caller.scene.player) {
            console.error('No player detected while validating sense in', caller);
            return false;
        } else {
            config.player = caller.scene.player;
        }
    }
    if(!caller.senseEvents) {
        caller.senseEvents = [];
    }
    if(!config.repeatTime) {
        if(!caller.updateSpeed) {
            console.error('No update speed for sense could be determined for', caller);
            return false;
        } else {
            config.repeatTime = caller.updateSpeed;
        }
    }
    if(!caller.sense) {
        console.error('No sense function found in caller ', caller);
        return false;
    }
    return true;

}
/**
 * Senses the player, then calles sense on caller on it
 * 
 * @memberof ClubCrawler.Interfaces.Sense
 * @param {Phaser.GameObjects.GameObject} caller - The caller game object
 * @param {ClubCrawler.Types.SenseConfig} config - The sense config
 * @returns {boolean}
 */
function sensePlayer(caller, config) {
    if(!caller) {
        caller=this;
    }
    if(!validateSense(caller, config)) {
        return false;
    }
    
    caller.sense({
        target: config.player,
        distance: Phaser.Math.Distance.Between(caller.x, caller.y, config.player.x, config.player.y)
    });
    return true;
}
/**
 * Senses the player, and repeats sensing at set intervals
 * 
 * @memberof ClubCrawler.Interfaces.Sense
 * @param {Phaser.GameObjects.GameObject} caller - The caller game object
 * @param {ClubCrawler.Types.SenseConfig} config - The sense config
 * @returns {boolean}
 */
function sensePlayerRepeat(caller, config) {
    if(!caller) {
        caller = this;
    }
    if(!sensePlayer(caller, config)) {
        return false;
    }
    caller.senseEvents.push(config.scene.time.delayedCall(config.repeatTime, sensePlayerRepeat, [caller, config]));
}


module.exports = {
    SensePlayer:sensePlayer,
    SensePlayerRepeat:sensePlayerRepeat
}
