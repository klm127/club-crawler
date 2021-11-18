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
        this.addDebugMessage = document.createElement('button');
        this.addDebugMessage.innerHTML = "add debug message";
        this.emitTestEvent = document.createElement('button');
        this.emitTestEvent.innerHTML = "emit test event";
        this.emitResponse = document.createElement('div');
        this.element.appendChild(this.pickupFlame);
        this.element.appendChild(this.pickupPotion);
        this.element.appendChild(this.addHealth);
        this.element.appendChild(this.loseHealth);
        this.element.appendChild(this.addScore);
        this.element.appendChild(this.addDebugMessage);
        this.element.appendChild(this.emitTestEvent);
        this.element.appendChild(this.emitResponse);
        this.uiManager = null;
        this.dataManager = null;
    }

    listenResponse() {
        this.emitResponse.innerHTML = `event detected. rand number: ${Math.floor(Math.random()*100)}`
        console.log('test event detected... context:', this);
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
        this.addDebugMessage.addEventListener('click', (ev)=> {
            uiManager.dataManager.log('test a rather longer debug message, which might take multiple lines  ' + Math.floor(Math.random()*100));
            uiManager.updateDebugMessages();
        })
    }
    loadDataManager(dataManager) {
        this.dataManager = dataManager;
        dataManager.emitter.on("testEvent", this.listenResponse, this);
        this.emitTestEvent.addEventListener('click', (ev)=> {
            dataManager.emitter.emit("testEvent");
        })

    }


    
}

module.exports = DebugUI;