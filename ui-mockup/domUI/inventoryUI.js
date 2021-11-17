const INVENTORY_PROPS = {
    className : "club-crawler-inventory",
    style: {
        height: "500px",
        backgroundColor: "rgba(0,0,100,0.9)",
        color: "white",

    }
}

const INVENTORY_CONTAINER_PROPS = {
    className : "club-crawler-inventory-slots-container",
    style: {
        display: "flex",
        flexWrap: "wrap",
        aligItems: "stretch",
        gap: "10px",
        alignContent: "end",
        padding: "10px",
        boxSizing:"border-box"
    }
}

const TITLE_PROPS = {
    className: "club-crawler-inventory-title",
    style: {
        width: "100%"
    },
    innerHTML: "Inventory"
}

const SLOT_PROPS = {
    className: "club-crawler-inventory-slot",
    style: {
        height: "55px",
        width: "55px",
        backgroundColor: "rgba(50,50,50,0.5)",
        position: "relative"
    }
}

const SLOT_IMG_PROPS = {
    className: "club-crawler-inventory-slot-image",
    style: {
        height: "100%",
        width: "100%",
        top: "0px",
        left: "0px",
        position: "absolute"
    }
}

const SLOT_QTY_PROPS = {
    className: "club-crawler-inventory-slot-qty",
    style: {
        height: "100%",
        width: "100%",
        position: "absolute",
        top: "2px",
        left: "2px"
    }
}

/**
 * @classdesc The inventory user interface
 * @memberof ClubCrawler.DOMUserInterface
 */
class InventoryUI {
    /**
     * @param {HTMLElement} element - The right UI container element
     */
    constructor(element) {
        /** @property {HTMLElement} - The containing html element */
        this.element = element;
        Object.assign(this.element, INVENTORY_PROPS);      
        Object.assign(this.element.style, INVENTORY_PROPS.style);
        /** @property {HTMLElement} - Contains the word "inventory" */
        this.titleElement = document.createElement('div');
        Object.assign(this.titleElement, TITLE_PROPS);
        Object.assign(this.titleElement.style, TITLE_PROPS.style);
        /** @property {HTMLElement} - Contains the inventory slots */
        this.slotsContainer = document.createElement('div');
        Object.assign(this.slotsContainer, INVENTORY_CONTAINER_PROPS);
        Object.assign(this.slotsContainer.style, INVENTORY_CONTAINER_PROPS.style);
        this.element.appendChild(this.titleElement);
        this.element.appendChild(this.slotsContainer);
        /** @property {Array} - The inventory slots */
        this.slots = [];
        /** @property {ClubCrawler.Objects.Inventory.Inventory} - The inventory to interface with, loaded on runtime */
        this.inventory = null;
        /** @property {ClubCrawler.Objects.UserInterface.Manager} - The UI manager, loaded on runtime */
        this.uiManager = null;
        /** @property {ClubCrawler.Objects.Inventory.InventoryItemSlot} - An inventory item slot which is being dragged */
        this.draggingSlot = null;
        /** @property {ClubCrawler.Objects.Inventory.InventoryItemSlot} - An inventory item slot which is being dragged over */
        this.draggingOverSlot = null;
    }

    /**
     * Loads the UI Manager
     * 
     * @param {ClubCrawler.DOMUserInterface.DOMUIManager} uiManager - The UI Manager
     */
    loadManager(uiManager) {
        this.uiManager = uiManager;
        for(let slot of this.slots) {
            slot.loadManager(this.uiManager);
        }
    }

    /**
     * Loads an inventory
     * 
     * @param {ClubCrawler.Objects.Inventory.Inventory} inventory - The inventory to interact with
     */
    loadInventory(inventory) {
        this.inventory = inventory;
        for(let itemSlot of inventory.itemSlots) {
            let itemUI = new ItemSlotUI(this.slotsContainer, itemSlot);
            if(this.uiManager) {
                itemUI.loadManager(this.uiManager);
            }
            this.slots.push(itemUI);
        }
        this.setDragListeners();
    }

    /**
     * Sets event listeners and logic for the drag-to-rearrange functionality of the inventory UI
     */
    setDragListeners() {
        var inventoryUI = this;
        for(let itemUI of this.slots) {
            itemUI.element.addEventListener('dragstart', (event)=> {
                if(!itemUI.slot.empty) {
                    inventoryUI.draggingSlot = itemUI.slot;
                }
            })
            itemUI.element.addEventListener('dragenter', (event)=> {
                inventoryUI.draggingOverSlot = itemUI.slot;
            })
            itemUI.element.addEventListener('dragend', (event)=> {
                if(inventoryUI.draggingOverSlot) {
                    inventoryUI.inventory.swapSlots(inventoryUI.draggingSlot, inventoryUI.draggingOverSlot);
                    let inventory = inventoryUI.inventory;
                    inventoryUI.clearInventory();
                    inventoryUI.loadInventory(inventory);
                }
            })
        }
    }

    /**
     * Calls updateDisplay on each UI slot to refresh it from inventory
     */
    refreshInventory() {
        for(let slot of this.slots) {
            slot.updateDisplay();
        }
    }
    /**
     * Clears inventory and DOM elements
     */
    clearInventory() {
        this.slots = []
        this.inventory = null;
        this.slotsContainer.innerHTML = "";
    }
}

/**
 * @classdesc UI component representing an inventory slot
 * @memberof ClubCrawler.DOMUserInterface
 */
class ItemSlotUI {
    /**
     * Represents an Inventory Item Slot on the UI using the DOM
     * 
     * @param {HTMLElement} parentElement - The container element one level above this
     * @param {ClubCrawler.Objects.Inventory.InventoryItemSlot} itemSlot - The inventory item slot to be represented
     */
    constructor(parentElement, itemSlot) {
        /** @property {HTMLElement} - The parent container */
        this.parentElement = parentElement;
        /** @property {ClubCrawler.Objects.Inventory.InventoryItemSlot} - the linked inventory item slot represented by this component*/
        this.slot = itemSlot;
        /** @property {HTMLElement} - The container for the inventory image and quantity */
        this.element = document.createElement('div');
        Object.assign(this.element, SLOT_PROPS);
        Object.assign(this.element.style, SLOT_PROPS.style);
        /** @property {HTMLImageElement} - An image of the item as it appears in inventory */
        this.image = document.createElement('img');
        Object.assign(this.image, SLOT_IMG_PROPS);
        Object.assign(this.image.style, SLOT_IMG_PROPS.style);
        /** @property {HTMLElement} - Displays quantity in inventory of stackable items */
        this.qty = document.createElement('div');
        Object.assign(this.qty, SLOT_QTY_PROPS);
        Object.assign(this.qty.style, SLOT_QTY_PROPS.style);
        this.element.appendChild(this.qty);
        this.element.appendChild(this.image);
        this.parentElement.appendChild(this.element);
        /** @property {ClubCrawler.DOMUserInterface.DOMUIManager} - The manager */
        this.uiManager = null;
        this.updateDisplay();        
    }
    /**
     * Updates the display from the linked inventory item slot
     */
    updateDisplay() {
        if(!this.slot.empty) {
            this.image.src = this.slot.parentInventory.scene.textures.list[this.slot.instanceConfig.inventorySprite].frames.__BASE.source.source.src;
            this.image.title = this.slot.instanceConfig.name;
            if(this.slot.itemType != "stackable") {
                this.qty.innerHTML = "";
            }
            else {
                this.qty.innerHTML = this.slot.quantity;
            }
        }
        else {
            this.image.src = "";
            this.image.title = "";
            this.qty.innerHTML = "";
        }
    }
    /**
     * Loads the UI Manager adds click listener
     * @param {ClubCrawler.DOMUserInterface.DOMUIManager} uiManager - The manager
     */
    loadManager(uiManager) {
        this.uiManager = uiManager;
        var slot = this.slot;
        this.element.addEventListener('click', (ev)=> {
            uiManager.slotClick(slot)
        })
    }
}

module.exports = InventoryUI;