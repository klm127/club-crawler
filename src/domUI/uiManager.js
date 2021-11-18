
/**
 * @classdesc Manages changes to displayed UI and changing game data based on UI interactions
 * @memberof ClubCrawler.DOMUserInterface
 */
class DOMUIManager {

    /**
     * @param {ClubCrawler.UserInterface.LeftUI} leftUI - the left user interface
     * @param {ClubCrawler.UserInterface.RightUI} rightUI - the right user interface
     * @param {ClubCrawler.Data.dataManager} dataManager - the data manager
     */
    constructor(leftUI, rightUI, dataManager) {
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
        /** @property {ClubCrawler.DOMUserInterface.DebugMessageBox} */
        this.debugMessages = this.leftUI.debugMessages;
        /** @property {ClubCrawler.Data.dataManager} - The dataManager */
        this.dataManager = dataManager;

        // properties initialized when game starts
        
        /** @property {ClubCrawler.Objects.Player} - The player */
        this.player = null;
        
        this.leftUI.loadDataManager(dataManager);

        dataManager.uiManager = this;
        

    }
    /**
     * 
     * @param {ClubCrawler.Objects.Player} player - The player
     * @param {Object} rightUI - the right UI
     * @param {Object} leftUI - the left UI
     */
    initialize(player) {
        /** @property {ClubCrawler.Objects.Player} - The player */
        this.player = player;

        this.healthBar.setFullHealth(player.health);
        this.rightUI.loadManager(this);
        this.leftUI.loadManager(this);

        this.dataManager.emitter.on('scoreChange', this.pointsChange, this);
        this.dataManager.emitter.on('healthChange', this.healthChange, this);
    }

    /**
     * Tells health bar to change in response to health change event
     */
    healthChange() {
        this.healthBar.changeHealth(this.player.health);
    }

    /**
     * Tells score to change in response to score change event
     */
    pointsChange() {
        this.score.changeScore(this.dataManager.score);
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

    /**
     * Updates debug messages
     */
    updateDebugMessages() {
        this.debugMessages.updateDebugMessages();
    }
}

module.exports = DOMUIManager;