const DEFAULT_STYLES = {
    height: "500px",
    backgroundColor: "rgba(0,0,100,0.9)",
    color: "white"
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
        Object.assign(this.element.style, DEFAULT_STYLES);      
        this.element.innerHTML = "inventory area";
    }
}

class ItemSlotUI {
    constructor(element) {
        this.element = element;
        
    }
}

module.exports = InventoryUI;