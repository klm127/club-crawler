const DEFAULT_STYLES = {
    height: "140px",
    backgroundColor: "rgba(50,50,100,0.9)",
    color: "white"
}

/**
 * @classdesc UI for info about wielded weapon
 */
class WeaponUI {
    /**
     * @param {HTMLElement} element - The weapon container element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element.style, DEFAULT_STYLES);      
        this.element.innerHTML = "weapon info area"; 
    }
}

module.exports = WeaponUI;