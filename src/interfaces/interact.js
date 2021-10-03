/**
 * Contains functions for interactions
 * 
 * @memberof ClubCrawler.Interfaces
 * 
 * @namespace Interact
 * 
 */

/**
 * Description
 * @memberof ClubCrawler.Interfaces.Interact
 * 
 * @param {any} damagedObject
 * @param {any} sourceObject
 * @returns {any}
 */
function validateDamage(damagedObject, sourceObject) {
    if(!sourceObject.damage) {
        console.error('Source object has no damage in validateDamage', sourceObject);
        return false;
    }
    if(!damagedObject.takeDamage) {
        console.error('damagedObject has no take damage func', damagedObject);
        return false;
    }
    if(!damagedObject.die) {
        console.error('damagedObject has no death function', damagedObject)
        return false;
    }
    return true;
}

/**
 * Damages an object... calls die() if its health is less than or equal to 0 
 * @memberof ClubCrawler.Interfaces.Interact
 * 
 * @param {Object} sourceObject
 * @param {int} sourceObject.damage - damage done
 * @param {function} [sourceObject.dealDamage] - function to call on source object upon hit of target
 * @param {Object} damagedObject - 
 * @param {int} damagedObject.health - health to decrement
 * @param {function} damagedObject.die - Function to call if damagedObject dies
 * @param {function} damagedObject.damage - Function to call on damagedObject as it gets damaged
 * @returns {bool} Whether damage succesfully applied
 */
function damageCollision(damagedObject, sourceObject) {
    console.log('dam object', damagedObject.frame.name);
    console.log('source object', sourceObject.frame.name);
    if(!validateDamage(damagedObject, sourceObject)) return false;

    //damagedObject.health -= sourceObject.damage;
    if(sourceObject.dealDamage) {
        sourceObject.dealDamage();
    }
    if(damagedObject.takeDamage) {
        damagedObject.takeDamage(sourceObject.damage);
    }
    if(damagedObject.health <= 0) {
        damagedObject.die();
    }
    return true;
}

/**
 * @memberof ClubCrawler.Interfaces.Interact
 * Calls damageCollision with reversed parameters
 * @param {any} sourceObject
 * @param {any} damagedObject
 * @returns {any}
 */
function damageCollisionReversed(sourceObject, damagedObject) {
    damageCollision(damagedObject,sourceObject);
}


module.exports = {
    DamageCollision: damageCollision,
    DamageCollisionReversed: damageCollisionReversed
}