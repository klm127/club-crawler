/**
 * @typedef {Object} ClubCrawler.Types.GameItemConfig
 * 
 * This configuration is passed to anything created based on Tiled Object Layer Data
 * 
 * It may have other properties. EVERY custom property in Tiled is applied to the config object {@link ClubCrawler.Utility.Parse}
 * 
 * @property {Phaser.Scene} scene - The physics scene
 * @property {number} - height - the TiledItem value 
 * @property {number} - id - the TiledItem value 
 * @property {string} - name - the TiledItem value 
 * @property {number} - rotation - the TiledItem value 
 * @property {string} - type - the TiledItem value 
 * @property {boolean} - visible - the TiledItem value 
 * @property {number} - width - the TiledItem value 
 * @property {number} - x - the TiledItem value 
 * @property {number} - y - the TiledItem value  
 * @property {Object} [properties] - The custom properties set in tile
 * */