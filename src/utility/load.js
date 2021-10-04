/**
 * @namespace ClubCrawler.Utility.Load
 */

//const BlueWorldParser = require('../mapParsers/blueworld');
/**
 * Preloads assets blueWorld requires
 * @memberof ClubCrawler.Utility.Load
 * @param {Phaser.Scene} scene
 */
function preloadBlueWorldAssets(scene) {
    scene.load.atlas({
        key:'playerimages', 
        textureURL: 'images/discord-avatars.png', 
        atlasURL: 'atlas/discord-avatars.json'
    });
    scene.load.atlas({
        key:'ogre', 
        textureURL: 'images/ogre.png', 
        atlasURL: 'images/ogre.json' 
    });
    scene.load.image('reticle', 'images/reticle.png');
    scene.load.image('bullet', 'images/bullet1.png');
    scene.load.image('coin', "images/coin.png");
    scene.load.image('cylinder', 'images/cylinder.png');

    //audio sprites
    scene.load.audioSprite('bullet-sound', 'sounds/bullet.json', 'sounds/bullet.mp3');
    scene.load.audioSprite('ogre-sound', 'sounds/ogre.json', 'sounds/ogre.mp3');
    scene.load.audioSprite('gamecoin', 'sounds/gamecoin.json', 'sounds/gamecoin.mp3');

    //tile maps
    
    scene.load.tilemapTiledJSON('blueworld','maps/blueworld.json');
    scene.load.image('blue-tileset', 'images/tilesets/blue-patterned-world.png');
    //return BlueWorldParser;

}






module.exports = {
    blueworld: preloadBlueWorldAssets
}