/**
 * Contains functions for interactions, to be called when two objects interact, such as when a bullet strikes an enemy or an enemy strikes a player.
 * 
 * @memberof ClubCrawler.Actions
 * 
 * @namespace Interact
 * 
 */

/**
 * Description
 * @memberof ClubCrawler.Actions.Interact
 * 
 * @param {any} damagedObject
 * @param {any} sourceObject
 * @returns {boolean}
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
 * @memberof ClubCrawler.Actions.Interact
 * 
 * @param {Object} sourceObject
 * @param {int} sourceObject.damage - damage done
 * @param {function} [sourceObject.dealDamage] - function to call on source object upon hit of target
 * @param {Object} damagedObject - 
 * @param {int} damagedObject.health - health to decrement
 * @param {function} damagedObject.die - Function to call if damagedObject dies
 * @param {function} damagedObject.damage - Function to call on damagedObject as it gets damaged
 * @returns {boolean} Whether damage succesfully applied
 */
function damageCollision(damagedObject, sourceObject) {
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
 * @memberof ClubCrawler.Actions.Interact
 * Calls damageCollision with reversed parameters
 * @param {any} sourceObject
 * @param {any} damagedObject
 * @returns {any}
 */
function damageCollisionReversed(sourceObject, damagedObject) {
    return damageCollision(damagedObject,sourceObject);
}


module.exports = {
    DamageCollision: damageCollision,
    DamageCollisionReversed: damageCollisionReversed
}


///   ---- These interfaces are defined for documentation purposes and has no effect on game logic ------- /// 

/**
 * @description Implemented by objects that take damage
 * @memberof ClubCrawler.Actions.Interact
 * @interface 
 */
 function Hurtable() {}
 
 /** @param {number} damage - The damage to take */
 Hurtable.takeDamage = (damage)=>{ throw new Error("not implemented!") };
 /** @property {number} health - The health of the Hurtable */
 Hurtable.health = null;
 /** called if health is <= 0 */
 Hurtable.die = ()=> {throw new Error("not implemented")};


/**
 * @description Implemented by objects that deal damage
 * @memberof ClubCrawler.Actions.Interact
 * @interface
 */
function DamageDealer() {}
/** Called on the object as it deals damage */
DamageDealer.dealDamage = () => {throw new Error("not implemented!") };
/** @property {number} damage - The damage the DamageDealer deals */
DamageDealer.damage = null;