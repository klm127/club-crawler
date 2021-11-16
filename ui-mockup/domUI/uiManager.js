
/**
 * @classdesc Manages changes to displayed UI and changing game data based on UI interactions
 */
class UIManager {
    /**
     * @param {ClubCrawler.Objects.Player} player - The player
     * @param {Object} rightUI - the right UI
     * @param {Object} leftUI - the left UI
     */
    constructor(player, rightUI, leftUI) {
        this.player = player;
        this.rightUI = rightUI;
        this.leftUI = leftUI;   
        this.weaponUI = this.rightUI.weaponUI;
        this.inventoryUI = this.rightUI.inventoryUI;

        this.rightUI.loadManager(this);
        this.leftUI.loadManager(this);
    }

    /**
     * Checks what weapon the player is wielding and displays that in the weapon info area
     */
    showPlayerWeapon() {
        this.weaponUI.showWeapon(this.player.weapon);
    }
    loadPlayerInventory() {
        this.inventoryUI.loadInventory(this.player.inventory);
    }
    refreshInventory() {
        this.inventoryUI.refreshInventory();
    }
    slotClick(slot) {
        if(slot.empty) {
            return false;
        }
        if(slot.itemType == "weapon") {
            if(slot.name != this.player.weapon.name) {
                this.player.weapon = slot.getInstance({
                    scene: this.player.scene,
                    wielder: this.player,
                    target: this.player.reticle
                });
                this.showPlayerWeapon();
            }
        }
    }
}

module.exports = UIManager;