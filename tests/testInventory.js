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

class PotionStub {
    constructor(config) {
        Object.assign(this, config);
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

    let weapInventory2 = new Inventory({
        inventorySize: 2,
    })
    let popper1 = new WeaponStub({
        wielder: "a player",
        scene:"a scene",
        target: "a reticle"
    })
    let popper2 = new WeaponStub({
        wielder: "a player",
        scene:"a scene",
        target: "a reticle"
    })
    weapInventory2.addItem(popper1);
    let result1 = weapInventory2.addItem(popper2);
    assert.equal(weapInventory2.full, false, "inventory adds duplicate weapons")
    assert.equal(result1, false, "adding duplicate weapon doesnt return false")
    console.log('👍 inventory does not add duplicate weapons');
    let testitem1 = new PotionStub({
        itemType: "stackable",
        name: "potion"
    });
    let testItem2 = new PotionStub({
        itemType: "stackable",
        name: "potion"
    });
    let potionInventory = new Inventory({
        inventorySize: 2
    })
    potionInventory.addItem(testitem1);
    potionInventory.addItem(testItem2);
    assert.equal(potionInventory.itemSlots[0].quantity, 2, "stackable inventory items dont stack");
    assert.equal(potionInventory.itemSlots[1].empty, true, "stackable items duplicate in inventory");
    console.log('👍 stackable inventory items stack correctly');
    let retrievedPotion = potionInventory.pop(0);
    assert.equal(potionInventory.itemSlots[0].quantity, 1, "stackable items dont decrement on pop");
    retrievedPotion = potionInventory.pop(0);
    assert.equal(potionInventory.itemSlots[0].empty, true, "stackable items dont empty");
    retrievedPotion = potionInventory.pop(0);
    assert.equal(retrievedPotion, false, "failure to retrieve stackable doesnt return false");
    console.log('👍 stackable items decrement on pop as expected')
    let swapInventory = new Inventory({
        inventorySize: 3
    })
    let testItem1 = new PotionStub({
        itemType: "stackable",
        name: "potion"
    })
    testItem2 = new PotionStub({
        itemType:"stackable",
        name:"potion2"
    });
    swapInventory.addItem(testItem1);
    swapInventory.addItem(testItem2);
    swapInventory.swapSlots(swapInventory.itemSlots[0], swapInventory.itemSlots[1]);
    let retrievedItem1 = swapInventory.pop(0);
    let retrievedItem2 = swapInventory.pop(1);
    assert.deepStrictEqual(retrievedItem1, testItem2, "item in slot 1 did not become slot 2 on swap!");
    assert.deepStrictEqual(retrievedItem2, testItem1, "item in slot 2 did not become the item in slot 1 on swap!");
    swapInventory.addItem(testItem1);
    swapInventory.swapSlots(swapInventory.itemSlots[0], swapInventory.itemSlots[2]);
    assert.equal(swapInventory.itemSlots[0].empty, true, "swapping to an empty slot didnt work!");
    assert.equal(swapInventory.itemSlots[2].empty, false, "swapping to an empty slot didnt work!")
    console.log('👍 slots swap positions as expected');
    
}
catch(e) {
    console.error(`An assertion test failed! ${e.code} - ${e.operator}`);
    console.log('   actual  :', e.actual);
    console.log('   expected:', e.expected);
    console.log(e.message);
}
