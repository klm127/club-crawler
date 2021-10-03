/**
 * Functions for ais to evaluate the world around them
 * 
 * Like Movement, work by firing events
 * 
 * Objects using senses should define a sense function
 */
import Phaser from "phaser"

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