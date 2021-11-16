const DEFAULT_STYLES = {
    width: "250px"
}


class DOMLeftUI {
    /**
     * @param {HTMLElement} element - The right UI element
     */
    constructor(element) {
        this.element = element;
        Object.assign(this.element.style, DEFAULT_STYLES);        

        debugElement = document.createElement('div');
        this.element.appendChild(debugElement);
        debugElement.innerHTML = element.width;
    }
}

module.exports = DOMLeftUI;