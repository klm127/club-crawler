/**
 * @typedef {Object} ClubCrawler.Types.WeaponConfig
 * 
 * Default configuration for a weapon and bullet. Default is the 'popper'
 * 
 * @property {number} [name="popper"] - Name of the weapon
 * @property {number} [duration=1000] - How long before the bullet disappers
 * @property {number} [projectileVelocity=1000] - Velocity of bullet
 * @property {number} [spin=2000] - Angular velocity of bullet
 * @property {number} [mass=0.1] - Mass of the bullet (affects knockback)
 * @property {number} [damage=20] - Damage dealt
 * @property {number} [fireRate=300] - Delay between bullet firings
 * @property {number} [spriteKey="bullet"] -
 * @property {number} [audioSpriteKey="bullet-sound"] -
 * @property {number} [audioFireKey="shot1"] -
 * @property {number} [audioBounceKey="bounce1"] -
 * @property {number} [audioHitKey="bounce1"] -
 * @property {number} [bounce=0.3] -
 * @property {number} [hitEnemies=true] -
 * @property {number} [overlapEnemies=false] -
 * @property {number} [hitWalls=true] -
 * @property {number} [hitPlayer=false] - Whether bullet hits player (causing physics transfer and damage)
 * @property {number} [overlapPlayer=false] - Whether bullet damages player by overlap. Only hitPlayer or overlapPlayer should be set to true, not both, but both may be false.
 * @property {number} [hitDestructibles=true] -
 * @property {number} [overlapDestructibles=false] -
 * @property {number} [destroyOnWallTouch=false] - Whether the bullet is destroyed when it contacts a wall
 * @property {string} [inventorySprite="popper-inventory"] - The inventory sprite to display
 * @property {string} [itemType="weapon"] - The item type for inventory purposes; weapons can't have multiples
 * @property {Phaser.Scene} scene - The scene where the weapon will operate _(added during run time!)_
 * @property {ClubCrawler.Objects.Player} wielder - The player wielding the weapon _(added during run time!)_
 * @property {ClubCrawler.Objects.Reticle} target - The target (reticle) for the weapon _(added during run time!)_
 * 
 * */