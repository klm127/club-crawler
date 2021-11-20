/**
 * @typedef {Object} ClubCrawler.Types.EnemyConfig
 * 
 * Default configuration for an enemy. Default is Ogre stats.
 * 
 * @property {string} [name = "Ogre"] - 
 * @property {number} [health = 300] - 
 * @property {number} [speed = 100] - 
 * @property {number} [maxSpeed = 500] - 
 * @property {number} [updateSpeed = 500] - How often the AI updates and changes patterns based on sense input 
 * @property {number} [velocityIncrement = 400] - Essentially, acceleration
 * @property {number} [mass = 5] - 
 * @property {number} [drag = 50] - 
 * @property {number} [maxCoins = 10] - 
 * @property {number} [minCoins = 5] - 
 * @property {number} [senseRange = 800] - How far away the enemy can sense the player
 * @property {number} [damage = 5] - 
 * @property {number} [sfxVolume = 0.1] - Not currently implemented / working
 * @property {number} [spriteKey = "ogre"] - 
 * @property {string} [spriteAttackFrame = "attack.png"] - 
 * @property {string} [spriteStillFrame = "still.png"] - 
 * @property {string} [audioSpriteKey = "ogre-sound"] - Overall audio sprite key
 * @property {number} [weapon = null] - Not yet implemented
 * 
 * */