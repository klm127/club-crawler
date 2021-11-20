const parameters = require('../../utility/parameters');
const dataManager = require('../data');

/**
 * @typedef ClubCrawler.Types.InventoryConfig
 * @property {number} [inventorySize=21] - The max number of items in inventory
 * @property {ClubCrawler.Objects.Player} [player=null] - The player _(added at run time!)_
 * @property {ClubCrawler.Objects.Reticle} [reticle=null] - The reticle _(added at run time!)_
 * @property {Phaser.Scene} [scene=null] - The scene _(added at run time!)_
 */
const PLAYER_INVENTORY_DEFAULTS = {
    inventorySize: 21,
    player: null,
    reticle: null,
    scene: null
}

/**
 * @namespace ClubCrawler.Objects.Inventory
 */

/** 
 * @classdesc 
 * The player's inventory
 * @memberof ClubCrawler.Objects.Inventory
*/
class Inventory {
    /**
     * @param {InventoryConfig} inventoryConfig - The inventory configuration
     * @param {number} inventoryConfig.inventorySize - The inventory size
     */
    constructor(inventoryConfig) {
        Object.assign(this, PLAYER_INVENTORY_DEFAULTS);
        Object.assign(this, inventoryConfig);
        /** @property {Array<ClubCrawler.Objects.Inventory.InventoryItemSlot>} - The inventory item slots in the inventory*/
        this.itemSlots = [];
        for(let i = 0; i < this.inventorySize; i++) {
            let slot = new InventoryItemSlot(this, i);
            this.itemSlots.push(slot);
        }
        /** @property {number} - The index of the next free slot */
        this.nextFreeSlot = 0;
        /** @property {boolean} - Whether the inventory is full */
        this.full = false;

    }
    /**
     * Adds an item to the inventory
     * @param {Object} gameItem - An item to add to the inventory
     * @param {String} [gameItem.itemType="general"] - The game item type. Items of type weapon can only have 1 copy in inventory with identical name. Stackables increase quanity by one. General can have duplicates.
     * @returns {boolean} - Whether the item could be added
     * @fires ClubCrawler.Events.inventoryChange
     */
    addItem(gameItem) {
        if(dataManager.debug.on && dataManager.debug.player.inventory) {
            dataManager.log('adding item to inventory?')
        }
        if(this.full) {
            if(dataManager.debug.on && dataManager.debug.player.inventory) {
                dataManager.log("player inventory full!")
            }
            return false; // cant add to a full inventory
        }
        if(!gameItem.itemType) {
            gameItem.itemType = "general";
        }
        else if(gameItem.itemType == "weapon") { //only 1 copy of each weapon
            for(let slot of this.itemSlots) {
                if(slot.itemType == "weapon") {
                    if(slot.instanceConfig.name == gameItem.name) {
                        if(dataManager.debug.on && dataManager.debug.player.inventory) {
                            dataManager.log(`cant add duplicate weapon! ${gameItem.name}`);
                        }
                        return false;
                    }
                }
            }
        }
        else if(gameItem.itemType == "stackable") {
            for(let slot of this.itemSlots) {
                if(slot.itemType == "stackable") {
                    if(!slot.empty) {
                        if(slot.instanceConfig.name == gameItem.name) {
                            slot.quantity += 1;
                            return true;
                        }
                    }
                }
            }
        }
        let slot = this.itemSlots[this.nextFreeSlot];
        slot.loadItem(gameItem);
        this.setNextFreeItemSlot();
        dataManager.emitter.emit("inventoryChange");
        return true;

    }
    /**
     * Finds the next empty slot in inventory and sets nextFreeSlot to that index
     */
    setNextFreeItemSlot() {
        for(let itemSlot of this.itemSlots) {
            if(itemSlot.empty) {
                this.nextFreeSlot = itemSlot.slotIndex;
                this.full = false;
                return true;
            }
        }
        this.full = true;
        return false;
    }
    /**
     * Swaps the positions of two slots. 
     * @param {InventoryItemSlot} slot1 - A slot
     * @param {InventoryItemSlot} slot2 - A slot
     */
    swapSlots(slot1, slot2) {
        let indexHolder = slot1.slotIndex;
        this.itemSlots[slot1.slotIndex] = slot2;
        this.itemSlots[slot2.slotIndex] = slot1;
        slot1.slotIndex = slot2.slotIndex;
        slot2.slotIndex = indexHolder;
        this.setNextFreeItemSlot();

    }
    /**
     * gets an instance of an item at a slot index
     * @param {number} index - the slot to get
     * @param {Object} [additionalConfig={}] - additional config params to give instance on construction
     */
    getInstance(index, additionalConfig = {}) {
        if(index >= this.inventorySize || index < 0) {
            return false;
        }
        return this.itemSlots[index].getInstance(additionalConfig);
    }
    /**
     * Gets an instance of an item at the slot index and clears that slot
     * @param {number} [index=0] - the slot to get
     * @param {Object} [additionalConfig={}] - additional config params to give instance on construction
     */
    pop(index=0, additionalConfig={}) {
        if(index >= this.inventorySize || index < 0) {
            return false;
        }
        let instance = this.itemSlots[index].popInstance(additionalConfig);
        this.setNextFreeItemSlot();
        return instance;
    }
}

/** 
 * @classdesc 
 * An inventory item slot
 * @memberof ClubCrawler.Objects.Inventory
*/
class InventoryItemSlot {
    /**
     * @param {ClubCrawler.Objects.Inventory.Inventory} parentInventory - the Inventory containing this item slot
     * @param {number} slotIndex - The index of parentInventory.slots where this slot is located
     */
    constructor(parentInventory, slotIndex) {
        /** @property {ClubCrawler.Objects.Inventory.Inventory} - The parent inventory */
        this.parentInventory = parentInventory;
        /** @property {number} - The index of parentInventory.slots where this slot is located */
        this.slotIndex = slotIndex;
        /** @property {function} - The class constructor for the creating object for returning it to the game */
        this.classRef = null;
        /** @property {Object} - The configuration object to pass to a new instance of the game object on creation */
        this.instanceConfig = null;
        /** @property {string} - The item type; weapon, general, or stackable (not fully implemented) */
        this.itemType = null;
        /** @property {boolean} - Whether this slot is empty or not */
        this.empty = true;
        /** @property {number} - The quantity (for stackable items) */
        this.quantity = 0;
    }
    /**
     * Loads an item into this slot
     * 
     * @param {Object} gameItem - The item to load into the slot. Must be an instance of a class.
     */
    loadItem(gameItem) {
        this.classRef = gameItem.constructor;
        if(gameItem.itemType) {
            this.itemType = gameItem.itemType;
        }
        else {
            this.itemType = "general";
        }
        this.instanceConfig = parameters.extract(gameItem);
        this.empty = false;
        this.quantity = 1;
    }
    /**
     * Gets a new instance of the item referenced in this slot
     * @param {Object} [additionalConfig={}] - Additional configuration option parameters to overwrite stored parameters, if desired
     * @returns {Object} - A new instance of the object stored in this slot
     */
    getInstance(additionalConfig={}) {
        let finalConfig = {}
        if(this.empty) return false;
        Object.assign(finalConfig, this.instanceConfig);
        Object.assign(finalConfig, additionalConfig);
        if(this.itemType == "weapon") {
            finalConfig.wielder = this.parentInventory.player;
            finalConfig.target = this.parentInventory.reticle;
            finalConfig.scene = this.parentInventory.scene;
        }
        let newInstance = new this.classRef(finalConfig);
        return newInstance;
    }
    /**
     * Gets a new instance of the item referenced in this slot then sets the slot to empty
     * @param {Object} [additionalConfig={}] - Additional configuration option parameters to overwrite stored parameters, if desired
     * @returns {Object} - A new instance of the object stored in this slot
     */
    popInstance(additionalConfig={}) {
        let instance = this.getInstance(additionalConfig);
        if(this.itemType == "stackable") {
            this.quantity -= 1;
            if(this.quantity <= 0) {
                this.empty = true;
            }
        }
        else {
            this.empty = true;
        }
        return instance;
    }
}

module.exports = Inventory;