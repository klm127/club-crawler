const Inventory = require('../src/objects/player/inventory.js')
const assert = require('assert');

class invTestItem {
    constructor(config) {
        Object.assign(this, config);        
    }
    doSomething() {
        return true;
    }
}

const weaponDefaults = {
    name: "popper",
    duration: 1000,
    projectileVelocity: 1000,
    spin: 2000,
    mass: 0.1,
    damage: 20,
    fireRate: 300,
    spriteKey: "bullet",
    audioSpriteKey: "bullet-sound",
    audioFireKey: "shot1",
    audioBounceKey: "bounce1",
    audioHitKey: "bounce1",
    bounce: 0.3,
    hitEnemies: true,
    overlapEnemies: false,
    hitWalls: true,
    hitPlayer: false,
    overlapPlayer: false,
    hitDestructibles: true,
    overlapDestructibles: false,
    destroyOnWallTouch: false,
    inventorySprite: "popper-inventory",
    itemType: "weapon"

}

class WeaponStub {
    constructor(config) {
        Object.assign(this, weaponDefaults);
        Object.assign(this, config);
        this.scene = config.scene;
        this.wielder = config.wielder;
        this.target = config.target;
        this.lastTimeFired = 0;

    }
    setTarget() {
        return false;
    }
    fire() {
        return false;
    }
}


try {
    let inventory = new Inventory({inventorySize: 2});
    assert.equal(inventory.full, false, 'inventory full on creation!')
    console.log('👍 inventory creates as expected');
    let gameItem = new invTestItem({myname:"item1"});
    inventory.addItem(gameItem);
    assert.equal(inventory.nextFreeSlot, 1, 'inventory free slot doesnt increase as expected when item added');
    console.log('👍 inventory increments next free slot as expected');
    let gameItem2 = new invTestItem({myname:"item2"});
    inventory.addItem(gameItem2);
    assert.equal(inventory.full, true, 'inventory not full when it should be');
    console.log('👍 inventory reads full as expected');
    let retrievedItem = inventory.getInstance(1); // get back gameItem2
    assert.deepStrictEqual(retrievedItem, gameItem2, 'retrieved item was not the same as the original');
    console.log('👍 retrieving an item works as expected');
    let gameItem3 = new invTestItem({myname:"item3"});
    inventory.addItem(gameItem3);
    retrievedItem = inventory.getInstance(1);
    assert.deepStrictEqual(retrievedItem, gameItem2, 'retrieved item was not the same as the original');
    console.log('👍 items dont add when inventory full');
    retrievedItem = inventory.pop(1);
    assert.deepStrictEqual(retrievedItem, gameItem2, 'inventory not returning properly on pop');
    assert.equal(inventory.full, false, 'inventory still full after popping an item')
    console.log('👍 popping inventory item returns as expected');
    inventory.addItem(gameItem3);
    retrievedItem = inventory.getInstance(1);
    assert.deepStrictEqual(retrievedItem, gameItem3, 'adding items after popping doesnt work as expected')
    console.log('👍 adding item after popping works as expected');
    let doesInstanceHaveFunction = false;
    if(retrievedItem.doSomething) {
        doesInstanceHaveFunction = true;
    }
    assert.equal(doesInstanceHaveFunction, true, 'created instance doesnt have method')
    console.log('👍 retrieved items appear to be configured properly');
    retrievedItem = inventory.pop(1, {scene:"myscene"});
    assert.deepStrictEqual(retrievedItem.scene, "myscene", 'adding additional config options didnt work as expected')
    console.log('👍 additional config on pop call works as expected');

    let weaponInventory = new Inventory({
        inventorySize: 2,
        player: {playerName:"bob"},
        reticle: {reticleType:"targetty"},
        scene: {sceneName:"mycoolScene"}
    });
    let popper = new WeaponStub({
        scene: {sceneName:"mycoolScene"},
        wielder: {playerName:"bob"}, 
        target: {reticleType:"targetty"}
    })
    weaponInventory.addItem(popper);
    let retrievedWeapon = weaponInventory.pop();
    assert.deepStrictEqual(retrievedWeapon.wielder, {playerName:'bob'}, 'wielder did not transfer to new instance');
    assert.deepStrictEqual(retrievedWeapon.target, {reticleType: 'targetty'}, 'reticle did not transfer to new instance');
    assert.deepStrictEqual(retrievedWeapon.scene, {sceneName:'mycoolScene'}, 'scene did not transfer to weapon instance');
    console.log('👍 popping weapon transferred runtime scene, reticle, wielder as expected')
    
}
catch(e) {
    console.error(`An assertion test failed! ${e.code} - ${e.operator}`);
    console.log('   actual  :', e.actual);
    console.log('   expected:', e.expected);
    console.log(e.message);
}
