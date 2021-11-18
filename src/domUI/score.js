const CONTAINER_PROPS = {
    id: "club-crawler-score-display",
    style: {
    }
}

const TITLE_PROPS = {
    id: "club-crawler-score-display-title",
    innerHTML: "score",
    style: {
        width:"100%"
    }
}

const SCORE_PROPS = {
    id: "club-crawler-score-display-value",
    innerHTML: 0,
    style: {
    }
}

/**
 * @classdesc The score display area. Update is called by UIManager on ScoreChange event.
 */
class ScoreUI {
    /**
     * @param {HTMLElement} element - The score container element.
     */
    constructor(element) {
        /** @member {HTMLElement} - The container for the score display. */
        this.element = element;
        Object.assign(this.element, CONTAINER_PROPS);
        Object.assign(this.element.style, CONTAINER_PROPS.style);
        /** @member {HTMLElement} - The title for the score display. */
        this.title = document.createElement('div');
        Object.assign(this.title, TITLE_PROPS);
        Object.assign(this.title.style, TITLE_PROPS.style);
        /** @member {HTMLElement} - The element which displays the score. */
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