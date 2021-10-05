let InventorySlot = require('./inventoryItemSlot');


const INVENTORY_SETTINGS = {
    maxItems: 21,
    className: "club-crawler-inventory-container",
    slotsContainerClassName: "club-crawler-inventory-slots-container",
    inventoryTitleClassName: "club-crawler-inventory-title",
}

const INVENTORY_HARD_STYLE = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection:"column",
    textAlign: "center",
}
const INVENTORY_SLOTS_CONTAINER_HARD_STYLE = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems:"stretch",
    gap: "10px",
    alignContent: "end",
}

class InventoryUI {
    constructor(parentContainer) {
        this.element = document.createElement('div');
        Object.assign(this.element.style, INVENTORY_HARD_STYLE);

        //create the title element
        this.inventoryTitleElement = document.createElement('div');
        this.inventoryTitleElement.innerHTML = "Inventory";
        this.inventoryTitleElement.className = INVENTORY_SETTINGS.inventoryTitleClassName;
        this.element.appendChild(this.inventoryTitleElement);

        //create the slots container
        this.slotsContainer = document.createElement('div');
        Object.assign(this.slotsContainer.style, INVENTORY_SLOTS_CONTAINER_HARD_STYLE);
        this.slotsContainer.className = INVENTORY_SETTINGS.slotsContainerClassName;
        this.element.appendChild(this.slotsContainer);
        this.parentContainer = parentContainer;

        //create the slots elements
        this.slots = [];
        for(let i = 0; i < INVENTORY_SETTINGS.maxItems; i++) {
            this.slots.push(new InventorySlot(this.slotsContainer));
        }

        //add self to parent
        this.parentContainer.appendChild(this.element);
    }
}

module.exports = InventoryUI;