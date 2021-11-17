
/**
 * @classdesc Manages changes to displayed UI and changing game data based on UI interactions
 * @memberof ClubCrawler.DOMUserInterface
 */
class DOMUIManager {
    /**
     * 
     * @param {ClubCrawler.Objects.Player} player - The player
     * @param {Object} rightUI - the right UI
     * @param {Object} leftUI - the left UI
     */
    constructor(player, rightUI, leftUI) {
        /** @property {ClubCrawler.Objects.Player} - The player */
        this.player = player;
        /** @property {ClubCrawler.DOMUserInterface.RightUI} - The right side UI */
        this.rightUI = rightUI;
        /** @property {ClubCrawler.DOMUserInterface.LeftUI} - The left side UI */
        this.leftUI = leftUI;   
        /** @property {ClubCrawler.DOMUserInterface.WeaponUI} - The weapon display UI */
        this.weaponUI = this.rightUI.weaponUI;
        /** @property {ClubCrawler.DOMUserInterface.InventoryUI} - The inventory UI */
        this.inventoryUI = this.rightUI.inventoryUI;
        /** @property {ClubCrawler.DOMUserInterface.HealthBarUI} - The health bar display */
        this.healthBar = this.rightUI.healthBarUI;
        /** @property {ClubCrawler.DOMUserInterface.ScoreUI} - The score display*/
        this.score = this.rightUI.scoreUI;

        this.healthBar.setFullHealth(player.health);

        this.rightUI.loadManager(this);
        this.leftUI.loadManager(this);
    }

    /**
     * Tells health bar to change after players health has changed
     */
    healthChange() {
        this.healthBar.changeHealth(this.player.health);
    }

    /**
     * Checks what weapon the player is wielding and displays that in the weapon info area
     */
    showPlayerWeapon() {
        this.weaponUI.showWeapon(this.player.weapon);
    }
    /**
     * Loads the player inventory into the inventory UI
     */
    loadPlayerInventory() {
        this.inventoryUI.loadInventory(this.player.inventory);
    }
    /**
     * Refreshes inventory UI
     */
    refreshInventory() {
        this.inventoryUI.refreshInventory();
    }
    /**
     * Called when an inventory slot is clicked.
     * 
     * If it's a weapon, equips that weapon and shows it in the weapon UI.
     * 
     * If it's a stackable it...
     * 
     * @param {ClubCrawler.Objects.Inventory.InventorySlot} slot - The slot that was clicked on
     */
    slotClick(slot) {
        if(slot.empty) {
            return false;
        }
        if(slot.itemType == "weapon") {
            if(slot.name != this.player.weapon.name) {
                this.player.weapon = slot.parentInventory.getInstance(slot.slotIndex, {
                    scene: this.player.scene,
                    wielder: this.player,
                    target: this.player.reticle
                });
                this.showPlayerWeapon();
            }
        }
        else if(slot.itemType == "stackable") {
            let retrievedItem = slot.parentInventory.pop(slot.slotIndex);
            this.refreshInventory();
        }
    }
}

module.exports = DOMUIManager;