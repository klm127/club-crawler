/**
 * Contains functions for different movement patterns
 * 
 * @memberof ClubCrawler.Interfaces
 * 
 * @namespace Movement
 * 
 */
import Phaser from "phaser";

/**
 * Validates a MovementConfig Object
 * 
 * @memberof ClubCrawler.Interfaces.Movement
 * @param {Phaser.GameObjects.GameObject} caller - The caller game object
 * @param {ClubCrawler.Types.MovementConfig} config - The movement config
 * @returns {boolean}
 */
function validatePhysicsMove(caller, config) {
    if(!caller) {
        validatePhysicsMove(this, config);
    }
    if(!config.scene) {
        if(!caller.scene) {
            console.error('No scene could be found for', caller);
            return false;
        }
        else {
            config.scene = caller.scene;
        }
    }
    if(!caller.body) {
        console.error('No physics body found in moveTowards function on', caller);
        return false;
    }
    if(!config.repeatTime) {
        if(!caller.updateSpeed) {
            console.error('No update speed could be determined in movetowards function on', caller);
            return false;
        } else {
            config.repeatTime = caller.updateSpeed;
        }
    } else {
        config.repeatTime = config.repeatTime;
    }
    if(!config.velocityIncrement) {
        if(!caller.velocityIncrement) {
            console.error('No velocity Increment could be determined for', caller);
            return false;
        } else{
            config.velocityIncrement = caller.velocityIncrement;
        }
    }
    if(!caller.moving) {
        //console.error('No "moving" boolean property could be found for', caller);
        caller.moving = true;
    }
    if(!config.moveRatio) config.moveRatio = 1;
    if(!config.lastX) config.lastX = caller.x;
    if(!config.lastY) config.lastY = caller.y;
    if(!config.failedAttempts) config.failedAttempts = 0;
    if(!config.maxFailedAttempts) config.maxFailedAttempts = 10;
    if(!config.failureDrift) config.failureDrift = 1;
    if(Phaser.Math.Difference(config.lastX, caller.x) <= config.failureDrift && Phaser.Math.Difference(config.lastY, caller.y) <= config.failureDrift) {
        if(config.maxFailedAttempts > 0) {
            config.failedAttempts += 1;
        }
    }
    if(config.failedAttempts > config.maxFailedAttempts && config.maxFailedAttempts > 0) {
        return false;
    }
    return true;
}
/**
 * retreat from player movement pattern
 * 
 * @memberof ClubCrawler.Interfaces.Movement
 * @param {Phaser.GameObjects.GameObject} caller - The caller game object
 * @param {ClubCrawler.Types.MovementConfig} config - The movement config
 * @returns {boolean}
 */
function retreatFromPlayer(caller, config) {
    if(!caller) {
        caller = this;
    }
    if(!validatePhysicsMove(caller, config)) {
        return false;
    }
    let player = config.scene.player;

    let hypoteneuse = Phaser.Math.Distance.Between(player.x, player.y, caller.x, caller.y);
    
    let adjacent = caller.x - player.x;
    let opposite = caller.y - player.y;
    let sine = opposite/hypoteneuse;
    let cosine = adjacent/hypoteneuse;

    let speedX = config.velocityIncrement * cosine * config.moveRatio;
    let speedY = config.velocityIncrement * sine * config.moveRatio; 

    caller.body.setVelocityX(speedX);
    caller.body.setVelocityY(speedY);

    config.scene.time.delayedCall(config.repeatTime, moveTowardsPlayer, [caller, config]);
}

/**
 * move towards player
 * 
 * @memberof ClubCrawler.Interfaces.Movement
 * @param {Phaser.GameObjects.GameObject} caller - The caller game object
 * @param {ClubCrawler.Types.MovementConfig} config - The movement config
 * @returns {boolean}
 */
function moveTowardsPlayer(caller, config) {
    if(!caller) {
        caller = this;
    }
    if(!validatePhysicsMove(caller, config)) {
        return false;
    }
    let player = config.scene.player;

    let hypoteneuse = Phaser.Math.Distance.Between(player.x, player.y, caller.x, caller.y);
    
    let adjacent = player.x - caller.x;
    let opposite = player.y - caller.y;
    let sine = opposite/hypoteneuse;
    let cosine = adjacent/hypoteneuse;

    let speedX = config.velocityIncrement * cosine;
    let speedY = config.velocityIncrement * sine; 

    caller.body.setVelocityX(speedX);
    caller.body.setVelocityY(speedY);

    return true;
}

/**
 * move towards player repeatedly (probably not necessary if you are calling it after a regular Sense update)
 * 
 * @memberof ClubCrawler.Interfaces.Movement
 * @param {Phaser.GameObjects.GameObject} caller - The caller game object
 * @param {ClubCrawler.Types.MovementConfig} config - The movement config
 * @returns {boolean}
 */
function moveTowardsPlayerRepeat(caller, config) {
    if(!caller) {
        caller = this;
    }
    if(moveTowardsPlayer(caller, config)) {
        caller.nextMoveEvent = config.scene.time.delayedCall(config.repeatTime, moveTowardsPlayerRepeat, [caller, config]);
        return true;
    } else {
        return false;
    }
}
/**
 * Moves in a random direction, but tries not to move into colliding walls
 * 
 * @memberof ClubCrawler.Interfaces.Movement
 * @param {Phaser.GameObjects.GameObject} caller - The caller game object
 * @param {ClubCrawler.Types.MovementConfig} config - The movement config
 * @returns {boolean}
 */
function moveRandomly(caller, config) {
    if(!validatePhysicsMove(caller, config)) {
        return false;
    } 
    let sine = (Math.random() - 0.5)*2;
    let cosine = (Math.random() - 0.5)*2;
    let speedX = config.velocityIncrement * cosine * config.moveRatio;
    let speedY = config.velocityIncrement * sine * config.moveRatio;
    let collisions = caller.body.checkCollision;
    if(collisions.up || collisions.down) {
        speedY = -speedY;
    }
    if(collisions.left || collisions.right) {
        speedX = -speedX;
    }
    caller.body.setVelocityX(speedX);
    caller.body.setVelocityY(speedY);
}

module.exports = {
    circle: null,
    chargePlayer: null,
    MoveTowardsPlayer: moveTowardsPlayer,
    MoveTowardsPlayerRepeat: moveTowardsPlayerRepeat,
    RetreatFromPlayer: retreatFromPlayer,
    MoveRandomly: moveRandomly,
    zigZag: null
}