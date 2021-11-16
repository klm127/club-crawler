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
    },
    innerHTML:0
}

/**
 * @classdesc The inventory user interface
 */
class InventoryUI {
    /**
     * @param {HTMLElement} element - The right UI container element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element, INVENTORY_PROPS);      
        Object.assign(this.element.style, INVENTORY_PROPS.style);
        this.titleElement = document.createElement('div');
        Object.assign(this.titleElement, TITLE_PROPS);
        Object.assign(this.titleElement.style, TITLE_PROPS.style);
        this.slotsContainer = document.createElement('div');
        Object.assign(this.slotsContainer, INVENTORY_CONTAINER_PROPS);
        Object.assign(this.slotsContainer.style, INVENTORY_CONTAINER_PROPS.style);
        this.element.appendChild(this.titleElement);
        this.element.appendChild(this.slotsContainer);
        this.slots = [];
        this.inventory = null;
    }
    loadInventory(inventory) {
        this.inventory = inventory;
        for(let itemSlot of inventory.itemSlots) {
            let itemUI = new ItemSlotUI(this.slotsContainer, itemSlot);
            this.slots.push(itemUI);
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

class ItemSlotUI {
    constructor(parentElement, itemSlot) {
        this.parentElement = parentElement;
        /** @property {ClubCrawler.Objects.Inventory.InventoryItemSlot} - the item slot */
        this.slot = itemSlot;
        this.element = document.createElement('div');
        Object.assign(this.element, SLOT_PROPS);
        Object.assign(this.element.style, SLOT_PROPS.style);
        this.image = document.createElement('img');
        Object.assign(this.image, SLOT_IMG_PROPS);
        Object.assign(this.image.style, SLOT_IMG_PROPS.style);
        this.qty = document.createElement('div');
        Object.assign(this.qty, SLOT_QTY_PROPS);
        Object.assign(this.qty.style, SLOT_QTY_PROPS.style);
        this.element.appendChild(this.qty);
        this.element.appendChild(this.image);
        this.parentElement.appendChild(this.element);
        this.updateDisplay();        
    }
    updateDisplay() {
        if(!this.slot.empty) {
            this.image.src = this.slot.parentInventory.scene.textures.list[this.slot.instanceConfig.inventorySprite].frames.__BASE.source.source.src;
            if(this.slot.itemType != "stackable") {
                this.qty.innerHTML = "";
            }
            else {
                this.qty.innerHTML == this.slot.quantity;
            }
        }
    }
}

module.exports = InventoryUI;