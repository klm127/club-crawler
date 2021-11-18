
/**
 * @classdesc Manages changes to displayed UI, event listeners, and changing game data based on UI interactions
 * @memberof ClubCrawler.DOMUserInterface
 */
class DOMUIManager {

    /**
     * @param {ClubCrawler.DOMUserInterface.LeftUI} leftUI - the left user interface
     * @param {ClubCrawler.DOMUserInterface.RightUI} rightUI - the right user interface
     * @param {ClubCrawler.Data.dataManager} dataManager - the data manager
     */
    constructor(leftUI, rightUI, dataManager) {
        /** @member {ClubCrawler.DOMUserInterface.RightUI} - The right side UI */
        this.rightUI = rightUI;
        /** @member {ClubCrawler.DOMUserInterface.LeftUI} - The left side UI */
        this.leftUI = leftUI;   
        /** @member {ClubCrawler.DOMUserInterface.WeaponUI} - The weapon display UI */
        this.weaponUI = this.rightUI.weaponUI;
        /** @member {ClubCrawler.DOMUserInterface.InventoryUI} - The inventory UI */
        this.inventoryUI = this.rightUI.inventoryUI;
        /** @member {ClubCrawler.DOMUserInterface.HealthBarUI} - The health bar display */
        this.healthBar = this.rightUI.healthBarUI;
        /** @member {ClubCrawler.DOMUserInterface.ScoreUI} - The score display*/
        this.score = this.rightUI.scoreUI;
        /** @member {ClubCrawler.DOMUserInterface.DebugMessageBox} */
        this.debugMessages = this.leftUI.debugMessages;
        /** @member {ClubCrawler.Data.dataManager} - The dataManager */
        this.dataManager = dataManager;

        // properties initialized when game starts
        
        /** @member {ClubCrawler.Objects.Player} - The player */
        this.player = null;
        
        this.leftUI.loadDataManager(dataManager);

        dataManager.uiManager = this;
        

    }
    /**
     * Initializes the User Inteface objects
     * @param {ClubCrawler.Objects.Player} player - The player
     */
    initialize(player) {
        /** @property {ClubCrawler.Objects.Player} - The player */
        this.player = player;

        this.healthBar.setFullHealth(player.health);
        this.rightUI.loadManager(this);
        this.leftUI.loadManager(this);

        this.inventoryUI.loadInventory(this.player.inventory);
        this.weaponUI.showWeapon(this.player.weapon);

        this.dataManager.emitter.on('scoreChange', this.pointsChange, this);
        this.dataManager.emitter.on('healthChange', this.healthChange, this);
        this.dataManager.emitter.on("inventoryChange", this.inventoryUI.refreshInventory, this.inventoryUI);
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
     * If it's a stackable it pops that item and... (implement)
     * 
     * @param {ClubCrawler.Objects.Inventory.InventoryItemSlot} slot - The slot that was clicked on
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