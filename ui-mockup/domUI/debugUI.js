/**
 * For mockup testing purposes only
 */


 const testingStubs = require('../testingStubs');

const DEBUG_PROPS = {
    className: "club-crawler-ui-debug",
    style: {
        backgroundColor: "orange"
    }
}

class DebugUI {
    constructor(element) {
        this.element = element;
        Object.assign(this.element, DEBUG_PROPS);
        Object.assign(this.element.style, DEBUG_PROPS.style)

        this.pickupFlame = document.createElement('button');
        this.pickupFlame.innerHTML = "pickup a flamethrower";
        this.pickupPotion = document.createElement('button');
        this.pickupPotion.innerHTML = "pickup a potion";
        this.element.appendChild(this.pickupFlame);
        this.element.appendChild(this.pickupPotion);

        this.uiManager = null;
    }

    loadManager(uiManager) {
        this.uiManager = uiManager;
        this.pickupFlame.addEventListener('click', (ev)=> {
            let flamethrower = new testingStubs.GeneralStub(testingStubs.FLAME_DEFAULTS);
            uiManager.player.inventory.addItem(flamethrower);
            uiManager.refreshInventory();

        });
        this.pickupPotion.addEventListener('click', (ev)=> {
            let potion = new testingStubs.GeneralStub({
                name:"health potion",
                itemType: "stackable",
                inventorySprite: "blue-potion"
            })
            uiManager.player.inventory.addItem(potion);
            uiManager.refreshInventory();
        })
    }


    
}

module.exports = DebugUI;