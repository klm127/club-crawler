const InventoryUI = require('./inventoryUI.js');
const HealthBarUI = require('./healthBar');
const WeaponUI = require('./activeWeapon');
const ScoreUI = require('./score.js');

const DEFAULT_STYLES = {
    width: "250px"
}

/**
 * @classdesc Creates instances and DOM elements for the right side UI
 * @memberof ClubCrawler.DOMUserInterface
 */
class RightUI {
    /**
     * @param {HTMLElement} element - The right UI container element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element.style, DEFAULT_STYLES);        

        const inventoryElement = document.createElement('div');
        /** @property {ClubCrawler.UserInterface.InventoryUI} - Shows player inventory */
        this.inventoryUI = new InventoryUI(inventoryElement);

        const weaponElement = document.createElement('div');
        /** @property {ClubCrawler.UserInterface.WeaponUI} - Shows player weapon */
        this.weaponUI = new WeaponUI(weaponElement);

        const healthBarElement = document.createElement('div');
        /** @property {ClubCrawler.UserInterface.HealthBar} - Shows player health */
        this.healthBarUI = new HealthBarUI(healthBarElement);

        const scoreElement = document.createElement('div');
        /** @property {ClubCrawler.UserInterface.ScoreUI} - Shows player score*/
        this.scoreUI = new ScoreUI(scoreElement);
        
        this.element.appendChild(inventoryElement);
        this.element.appendChild(weaponElement);
        this.element.appendChild(healthBarElement);
        this.element.appendChild(scoreElement);
        /** @property {ClubCrawler.UserInterface.DOMUIManager} - The manager */
        this.uiManager = null;
    }

    /**
     * Loads the manager
     * @param {ClubCrawler.UserInterface.DOMUIManager} - The manager
     */
    loadManager(uiManager) {
        this.uiManager = uiManager;
        this.inventoryUI.loadManager(uiManager);
        this.weaponUI.loadManager(uiManager);
    }
}

module.exports = RightUI;