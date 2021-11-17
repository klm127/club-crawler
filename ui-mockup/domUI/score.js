const CONTAINER_PROPS = {
    className: "club-crawler-score-display",
    style: {
        height: "60px",
        backgroundColor: "rgba(150,50,100,0.9)",
        color: "white"
    }
}

const TITLE_PROPS = {
    className: "club-crawler-score-display-title",
    innerHTML: "score",
    style: {
        width:"100%"
    }
}

const SCORE_PROPS = {
    className: "club-crawler-score-display-value",
    innerHTML: 0,
    style: {
    }
}

/**
 * @classdesc The player health bar area
 */
class ScoreUI {
    /**
     * @param {HTMLElement} element - The health bar container element
     */
    constructor(element) {
        /** @property {HTMLElement} - The container for the score display */
        this.element = element;
        Object.assign(this.element, CONTAINER_PROPS);
        Object.assign(this.element.style, CONTAINER_PROPS.style);
        /** @property {HTMLElement} - The title for the score display */
        this.title = document.createElement('div');
        Object.assign(this.title, TITLE_PROPS);
        Object.assign(this.title.style, TITLE_PROPS.style);
        /** @property {HTMLElement} - The value of the score to display */
        this.value = document.createElement('div');
        Object.assign(this.value, SCORE_PROPS);
        Object.assign(this.value.style, SCORE_PROPS.style);
        this.element.appendChild(this.title);
        this.element.appendChild(this.value);        
    }

    /**
     * Displays a new score
     * 
     * @param {number} newScore - The new score to display
     */
    changeScore(newScore) {
        this.value.innerHTML = newScore
    }
}

module.exports = ScoreUI;