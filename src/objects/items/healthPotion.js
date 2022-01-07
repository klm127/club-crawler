class HealthPotion {

    constructor(config) {
        this.inventorySprite = "blue-potion"
        this.itemType = "stackable"
        if("player" in config) {
            config.player.heal(50)
        }
    }
}

module.exports = HealthPotion

