
const CLASS_NAME = "club-crawler-inventory-item-slot"
const ITEM_SLOT_HARD_STYLE = {
    width: "50px",
    height: "50px",
    border: "2px dashed gray"
}
/**
 * @memberof ClubCrawler.Ui
*/
class InventoryItemSlot {
    /**
     * Creates the empty inventory item slot
     * 
     * @param {HTMLElement} domContainer - The container where the dom element will be placed
     */
    constructor(domContainer) {
        this.element = document.createElement('div')
        Object.assign(this.element.style, ITEM_SLOT_HARD_STYLE);
        domContainer.appendChild(this.element);
        this.element.className = CLASS_NAME;
        this.item = null;
        this.clickListener = null;
    }
    /**
     * Loads an item into the slot
     * @param {any} gameItem
     * @returns {any}
     */
    loadItem(gameItem) {
        // display the image, load up styles, attach a click listener
        // first iteration will probably just display the items name and type
    }
    removeItem(gameItem) {
        // remove the image, change styles as necessary, remove the click listener
    }
    click(ev) {
        // process a click...
    }
}

module.exports = InventoryItemSlot;