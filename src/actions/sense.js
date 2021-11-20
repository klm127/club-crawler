/**
 * Functions for ais to evaluate the world around them.
 * 
 * Objects using senses should define a sense function.
 * 
 * The "repeat" functions call .sense on the object using the sense function; that object should define how it responds to senses, such as by using a movement function.
 * 
 * @memberof ClubCrawler.Actions
 * 
 * @namespace Sense
 * 
 */



import Phaser from "phaser"

/**
 * Validates a SenseConfig Object
 * 
 * @memberof ClubCrawler.Actions.Sense
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
 * @memberof ClubCrawler.Actions.Sense
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
 * @memberof ClubCrawler.Actions.Sense
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


///   ---- This interface is defined for documentation purposes and has no effect on game logic ------- /// 

/**
 * @memberof ClubCrawler.Actions.Sense
 * @interface 
 */
 function Senser() {}

 /**
  * A sense function called on an object which is using the {@link ClubCrawler.Actions.Sense sense mixin}.
  * 
  * @param {ClubCrawler.Types.SensationConfig} sensationConfig - The result of sensing the target
  */
  Senser.sense = function(sensationConfig) {
     throw new Error("not implemented!")
 }