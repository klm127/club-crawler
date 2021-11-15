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
    
}
catch(e) {
    console.error(`An assertion test failed! ${e.code} - ${e.operator}`);
    console.log('   actual  :', e.actual);
    console.log('   expected:', e.expected);
    console.log(e.message);
}
