/**
 * @typedef {Object} ClubCrawler.Types.MovementConfig
 * 
 * @property {Phaser.Scene} scene - The physics scene
 * @property {number} [repeatTime] - How often to update for repeated functions
 * @property {number} [velocityIncrement] - How fast to move the object
 * @property {number} [moveRatio=1] - How much do multiply velocity by, relevant if velocityIncrement is determined from the object being moved instead
 * @property {number} [maxFailedAttempts=10] - How many times a repeating movement will be executed without success before it stops trying
 * @property {number} [failureDrift=1] - If a repeating movement, how much offset from the last x/y is considered a failed attempt after the move
 * /
 */
