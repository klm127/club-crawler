const SECTION_PROPS = {
    className: "club-crawler-weapon-ui",
    style: {
        height: "160px",
        width: "100%",
        backgroundColor: "rgba(50,50,100,0.9)",
        color: "white"
    }
}

const WEAPON_TITLE_PROPS = {
    className: "club-crawler-weapon-name",
    style: {
    }
}

const WEAPON_CONTENT_PROPS = {
    className: "club-crawler-weapon-content",
    style: {
        display: "flex",
        justifyContent: "center"
    }
}

const WEAPON_PICTURE_PROPS = {
    className: "club-crawler-weapon-picture",
    style: {
        height: "128px",
        width: "128px",
    }
}

const WEAPON_DESC_PROPS = {
    className: "club-crawler-weapon-desc",
    style: {
        width: "50%",
    }
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
        this.weaponPicture = document.createElement('img');
        this.weaponContent = document.createElement('div');
        this.weaponName = document.createElement('div');
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

    }
    /**
     * @param {ClubCrawler.Objects.Weapon} weapon - The weapon to display info for
     */
    showWeapon(weapon) {
        this.weaponName.innerHTML = weapon.name;
        if(weapon.description) {
            this.weaponDesc.innerHTML = weapon.description;
        }
        this.weaponPicture.src = weapon.scene.textures.list[weapon.inventorySprite].frames.__BASE.source.source.src
    }
}

module.exports = WeaponUI;