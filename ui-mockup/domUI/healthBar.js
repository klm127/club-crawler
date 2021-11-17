const CONTAINER_PROPS = {
    className: "club-crawler-health-container",
    style:{
        height: "80px",
        backgroundColor: "rgba(0,50,100,0.9)",
        color: "white"
    }
}
const TITLE_PROPS = {
    className: "club-crawler-health-title",
    innerHTML: "health",
    style: {
        width: "100%"
    }
}

const HEALTH_BAR_OUTER = {
    className: "club-crawler-health-bg",
    style: {
        width: "100%",
        height: "20px",
        backgroundColor: "purple"
    }
}

const HEALTH_BAR = {
    className: "club-crawler-health-bar",
    style: {
        height: "99%",
        backgroundColor: "red"
    }
}

/**
 * @classdesc The player health bar area
 * @memberof ClubCrawler.DOMUserInterface
 */
class HealthBarUI {
    /**
     * @param {HTMLElement} element - The health bar container element
     */
    constructor(element) {
        /** @property {HTMLElement} - The health bar container element */
        this.element = element;
        Object.assign(this.element, CONTAINER_PROPS);       
        Object.assign(this.element.style, CONTAINER_PROPS.style);
        /** @property {HTMLElement} - The health bar title element */
        this.title = document.createElement('div');
        Object.assign(this.title, TITLE_PROPS);
        Object.assign(this.title.style, TITLE_PROPS.style);
        this.element.appendChild(this.title);
        /** @property {HTMLElement} - The health bar background */
        this.healthBack = document.createElement('div');
        Object.assign(this.healthBack, HEALTH_BAR_OUTER);
        Object.assign(this.healthBack.style, HEALTH_BAR_OUTER.style);
        this.element.appendChild(this.healthBack);
        /** @property {HTMLElement} - The health bar which changes size */
        this.healthBar = document.createElement('div');
        Object.assign(this.healthBar, HEALTH_BAR);
        Object.assign(this.healthBar.style, HEALTH_BAR.style);
        this.healthBack.appendChild(this.healthBar);

        /** @property {number} - The largest health recorded */
        this.largestHealth = 50;
        /** @property {number} - The current health */
        this.currentHealth = null;
    }

    /**
     * Sets the full health value
     * @param {number} health - The health value
     */
    setFullHealth(health) {
        this.largestHealth = health;
        if(!this.currentHealth) {
            this.currentHealth = health;
        }
        this.refreshHealthBar();
    }

    /**
     * Changes health stat and refreshes bar
     * @param {number} newHealth - the new health of the player
     */
    changeHealth(newHealth) {
        this.currentHealth = newHealth;
        if(this.currentHealth > this.largestHealth) {
            this.largestHealth = this.currentHealth;
        }
        else if(this.currentHealth <= 0) {
            this.currentHealth = 0;
        }
        this.refreshHealthBar();
    }

    /**
     * Sets the health bar size based on max health achieved, displays the value
     */
    refreshHealthBar() {
        let healthRatio = this.currentHealth/this.largestHealth;
        let healthString = Math.floor(healthRatio*100) + "%";
        this.healthBar.style.width = healthString;
        this.healthBar.innerHTML = Math.floor(this.currentHealth);
    }
}

module.exports = HealthBarUI;