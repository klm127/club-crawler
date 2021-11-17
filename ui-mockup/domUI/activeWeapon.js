const SECTION_PROPS = {
    id: "club-crawler-weapon-ui",
    style: {
        height: "160px",
        width: "100%"
    }
}

const WEAPON_TITLE_PROPS = {
    id: "club-crawler-weapon-name",
    style: {
    }
}

const WEAPON_CONTENT_PROPS = {
    id: "club-crawler-weapon-content",
    style: {
        display: "flex",
        justifyContent: "center"
    }
}

const WEAPON_PICTURE_PROPS = {
    id: "club-crawler-weapon-picture",
    style: {
        height: "128px",
        width: "128px",
    }
}

const WEAPON_DESC_PROPS = {
    id: "club-crawler-weapon-desc",
    style: {
        width: "50%",
    }
}

/**
 * @classdesc UI for info about wielded weapon
 * 
 * @memberof ClubCrawler.DOMUserInterface
 */
class WeaponUI {
    /**
     * @param {HTMLElement} element - The DOM container element
     */
    constructor(element) {
        /** @property {HTMLElement} - The DOM container element */
        this.element = element;
        /** @property {HTMLImageElement} - The picture of the equipped weapon as it appears in inventory */
        this.weaponPicture = document.createElement('img');
        /** @property {HTMLElement} - The DOM element containing the picture and description */
        this.weaponContent = document.createElement('div');
        /** @property {HTMLElement} - The DOM element containing the name of the weapon */
        this.weaponName = document.createElement('div');
        /** @property {HTMLElement} - The DOM element containing the weapon description */
        this.weaponDesc = document.createElement('div');
        Object.assign(this.element, SECTION_PROPS);
        Object.assign(this.weaponName, WEAPON_TITLE_PROPS);
        Object.assign(this.weaponContent, WEAPON_CONTENT_PROPS);
        Object.assign(this.weaponPicture, WEAPON_PICTURE_PROPS);
        Object.assign(this.weaponDesc, WEAPON_DESC_PROPS);
        Object.assign(this.element.style, SECTION_PROPS.style);
        Object.assign(this.weaponName.style, WEAPON_TITLE_PROPS.style);
        Object.assign(this.weaponContent.style, WEAPON_CONTENT_PROPS.style);
        Object.assign(this.weaponPicture.style, WEAPON_PICTURE_PROPS.style);
        Object.assign(this.weaponDesc.style, WEAPON_DESC_PROPS.style);
        this.element.appendChild(this.weaponName);
        this.element.appendChild(this.weaponContent);
        this.weaponContent.appendChild(this.weaponPicture);
        this.weaponContent.appendChild(this.weaponDesc);
        this.uiManager = null;

    }
    /**
     * Displays information about a weapon in the User Interface.
     * 
     * @param {ClubCrawler.Objects.Weapon} weapon - The weapon to display
     */
    showWeapon(weapon) {
        this.weaponName.innerHTML = weapon.name;
        if(weapon.description) {
            this.weaponDesc.innerHTML = weapon.description;
        }
        this.weaponPicture.src = weapon.scene.textures.list[weapon.inventorySprite].frames.__BASE.source.source.src
    }

    /**
     * Loads the UI Manager
     * 
     * @param {ClubCrawler.DOMUserInterface.DOMUIManager} uiManager - The UI Manager
     */
    loadManager(uiManager) {
        this.uiManager = uiManager;
    }
}

module.exports = WeaponUI;