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
        this.addHealth = document.createElement('button');
        this.addHealth.innerHTML = "add 5 health";
        this.loseHealth = document.createElement('button');
        this.loseHealth.innerHTML = "subtract 7 health";
        this.addScore = document.createElement('button');
        this.addScore.innerHTML = "add 1 score";
        this.element.appendChild(this.pickupFlame);
        this.element.appendChild(this.pickupPotion);
        this.element.appendChild(this.addHealth);
        this.element.appendChild(this.loseHealth);
        this.element.appendChild(this.addScore);
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
        });
        this.addHealth.addEventListener('click', (ev) => {
            uiManager.player.health += 5;
            uiManager.healthChange();
        })
        this.loseHealth.addEventListener('click', (ev) => {
            uiManager.player.health -= 5;
            uiManager.healthChange();
        })
    }


    
}

module.exports = DebugUI;