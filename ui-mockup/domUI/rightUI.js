const InventoryUI = require('./inventoryUI.js');
const HealthBarUI = require('./healthBar');
const WeaponUI = require('./activeWeapon');
const ScoreUI = require('./score.js');

const DEFAULT_STYLES = {
    width: "250px"
}

/**
 * @classdesc Creates instances and DOM elements for the right side UI
 */
class DOMRightUI {
    /**
     * @param {HTMLElement} element - The right UI container element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element.style, DEFAULT_STYLES);        

        const inventoryElement = document.createElement('div');
        this.inventoryUI = new InventoryUI(inventoryElement);

        const weaponElement = document.createElement('div');
        this.weaponUI = new WeaponUI(weaponElement);

        const healthBarElement = document.createElement('div');
        this.healthBarUI = new HealthBarUI(healthBarElement);

        const scoreElement = document.createElement('div');
        this.scoreUI = new ScoreUI(scoreElement);
        
        this.element.appendChild(inventoryElement);
        this.element.appendChild(weaponElement);
        this.element.appendChild(healthBarElement);
        this.element.appendChild(scoreElement);

        this.uiManager = null;
    }

    loadManager(uiManager) {
        this.uiManager = uiManager;
        this.inventoryUI.loadManager(uiManager);
        this.weaponUI.loadManager(uiManager);
    }
}

module.exports = DOMRightUI;