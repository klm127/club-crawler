
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
    }

    /**
     * Checks what weapon the player is wielding and displays that in the weapon info area
     */
    showPlayerWeapon() {
        console.log('show player weapon called')
        this.weaponUI.showWeapon(this.player.weapon);

    }
}

module.exports = UIManager;