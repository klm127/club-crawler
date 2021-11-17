const DebugUI = require('./debugUI');

const DEFAULT_STYLES = {
    width: "250px"
}

/**
 * @classdesc Creates instances and DOM elements for the left side UI
 * @memberof ClubCrawler.DOMUserInterface
 */

class DOMLeftUI {
    /**
     * @param {HTMLElement} element - The right UI element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element.style, DEFAULT_STYLES);
        
        this.debugElement = document.createElement('div');
        this.debug = new DebugUI(this.debugElement);
        this.element.appendChild(this.debugElement);

        this.uiManager = null;        
        
    }

    loadManager(uiManager) {
        this.uiManager = uiManager;
        this.debug.loadManager(uiManager);
    }
}

module.exports = DOMLeftUI;