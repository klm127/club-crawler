const CONTAINER_PROPS = {
    id: "club-crawler-health-container",
    style:{
    }
}
const TITLE_PROPS = {
    id: "club-crawler-health-title",
    innerHTML: "health",
    style: {
        width: "100%"
    }
}

const HEALTH_BAR_OUTER = {
    id: "club-crawler-health-bg",
    style: {
        width: "90%",
        height: "20px",
    }
}

const HEALTH_BAR = {
    id: "club-crawler-health-bar",
    style: {
        height: "99%",
    }
}

/**
 * @classdesc The player health bar area. Update is called by UIManager on a HealthChange event. How large the health bar is depends on the largest health the player has reached.
 * @memberof ClubCrawler.DOMUserInterface
 */
class HealthBarUI {
    /**
     * @param {HTMLElement} element - The health bar container element
     */
    constructor(element) {
        /** @member {HTMLElement} - The health bar area container element. */
        this.element = element;
        Object.assign(this.element, CONTAINER_PROPS);       
        Object.assign(this.element.style, CONTAINER_PROPS.style);
        /** @member {HTMLElement} - The health bar title element. */
        this.title = document.createElement('div');
        Object.assign(this.title, TITLE_PROPS);
        Object.assign(this.title.style, TITLE_PROPS.style);
        this.element.appendChild(this.title);
        /** @member {HTMLElement} - The health bar background element. */
        this.healthBack = document.createElement('div');
        Object.assign(this.healthBack, HEALTH_BAR_OUTER);
        Object.assign(this.healthBack.style, HEALTH_BAR_OUTER.style);
        this.element.appendChild(this.healthBack);
        /** @member {HTMLElement} - The health bar which changes size based on player health.*/
        this.healthBar = document.createElement('div');
        Object.assign(this.healthBar, HEALTH_BAR);
        Object.assign(this.healthBar.style, HEALTH_BAR.style);
        this.healthBack.appendChild(this.healthBar);

        /** @member {number} - The largest health recorded. */
        this.largestHealth = 50;
        /** @member {number} - The current health. */
        this.currentHealth = null;
    }

    /**
     * Sets the largest health value and refreshes the health bar.
     * @param {number} health - The health value.
     */
    setFullHealth(health) {
        this.largestHealth = health;
        if(!this.currentHealth) {
            this.currentHealth = health;
        }
        this.refreshHealthBar();
    }

    /**
     * Changes health stat and refreshes bar.
     * @param {number} newHealth - The new health of the player.
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
     * Sets the health bar size based on max health achieved and displays the current health.
     */
    refreshHealthBar() {
        let healthRatio = this.currentHealth/this.largestHealth;
        let healthString = Math.floor(healthRatio*100) + "%";
        this.healthBar.style.width = healthString;
        this.healthBar.innerHTML = Math.floor(this.currentHealth);
    }
}

module.exports = HealthBarUI;