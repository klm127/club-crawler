/**
 * Methods for object interactions
 * 
 * Mostly to be set up by the MapManager for collisions
 * 
 */
function validateDamage(sourceObject, damagedObject) {
    if(!sourceObject.damage) {
        console.error('Source object has no damage in validateDamage', sourceObject);
        return false;
    }
    if(!damagedObject.health) {
        console.error('damagedObject has no health', damagedObject);
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
function damageCollision(sourceObject, damagedObject) {
    if(!validateDamage(sourceObject, damagedObject)) return false;

    damagedObject.health -= sourceObject.damage;
    if(sourceObject.dealDamage) {
        sourceObject.dealDamage();
    }
    if(damagedObject.takeDamage) {
        damagedObject.takeDamage();
    }
    if(damagedObject.health <= 0) {
        damagedObject.die();
    }
    return true;
}


module.exports = {
    DamageCollision: damageCollision
}