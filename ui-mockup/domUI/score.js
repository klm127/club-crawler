const DEFAULT_STYLES = {
    height: "80px",
    backgroundColor: "rgba(150,50,100,0.9)",
    color: "white"
}

/**
 * @classdesc The player health bar area
 */
class ScoreUI {
    /**
     * @param {HTMLElement} element - The health bar container element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element.style, DEFAULT_STYLES);       
        this.element.innerHTML = "score area";
    }
}

module.exports = ScoreUI;