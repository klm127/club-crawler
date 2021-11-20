/**
 * @namespace Events
 * @memberof ClubCrawler
 * @description Uses {@link https://newdocs.phaser.io/docs/3.55.2/Phaser.Events.EventEmitter Phaser.Events.EventEmitter} in {@link ClubCrawler.Data.dataManager dataManager.emitter} and {@link ClubCrawler.Types.DebugConfig dataManager.debug.emitter}
 */

/**
 * @event
 * @name healthChange
 * @memberof ClubCrawler.Events
 * @description Fired when player health changes. 
 * @type Phaser.Event
 */
/**
 * @event
 * @name scoreChange
 * @memberof ClubCrawler.Events
 * @description Fired when score changes.
 * @type Phaser.Event
 */
/**
 * @event
 * @name inventoryChange
 * @memberof ClubCrawler.Events
 * @description Fired when inventory changes.
 * @type Phaser.Event
 */
/**
 * @event
 * @name debugLog
 * @memberof ClubCrawler.Events
 * @description Fired when a debug message is logged.
 * @type Phaser.Event
 */
/**
 * @event
 * @name enemyDied
 * @memberof ClubCrawler.Events
 * @description Fired when an enemy dies.
 * @type Phaser.Event
 */
/**
 * @event
 * @name debugMessageToggle
 * @memberof ClubCrawler.Events
 * @description Fired when {@link ClubCrawler.Data.dataManager dataManager#on} is toggled
 * @type Phaser.Event
 */
/**
 * @event
 * @name playerDied
 * @memberof ClubCrawler.Events
 * @description Fired when player dies.
 * @type Phaser.Event
 * @todo implement listener in scene
 */
