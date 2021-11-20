/**
 * @typedef {Object} ClubCrawler.Types.DebugConfig
 * 
 * Default configuration for a destructible object 
 * 
 * @property {boolean} [on=false] - Whether debug is active and should be displayed
 * @property {number} [duration=3000] - How long a message remains on the scene
 * @property {number} [max=10] - Max number of messages to show on the overlay
 * @property {Object} weapon - Debug settings for weapon
 * @property {boolean} weapon.sound - Info about weapon sounds
 * @property {Object} items - Debug settings for items
 * @property {boolean} items.overlap - Info about items overlapping players
 * @property {Object} enemies - Debug settings for enemies
 * @property {boolean} enemies.die - Info about enemy deaths
 * @property {Object} destructibles - Debug settings for destructibles
 * @property {boolean} destructibles.cylinder - Info about cylinders
 * @property {boolean} destructibles.colliders - Info about cylinder colliders
 * @property {Object} logic - Debug settings for game logic
 * @property {boolean} logic.win - Info about game wins
 * @property {Object} map - Debug settings for map parsings
 * @property {boolean} map.placePlayer - Info about player start positions
 * @property {boolean} map.layers - Info about map layers
 * @property {boolean} map.functions - Info about map functions
 * @property {Object} player - Debug settings for player
 * @property {boolean} player.construction - Info about player construction
 * @property {Phaser.Events.EventEmitter} emitter - An emitter for debug messaging events.
 * 
 * */