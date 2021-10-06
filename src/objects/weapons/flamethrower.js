const Weapon = require('./weapon');

/**
 * @memberof ClubCrawler.Objects.Weapons
 * 
 * @classdesc A FlameThrower
 */
const FLAMETHROWER_DEFAULT_STATS = {
    name: "flamethrower",
    duration: 500,
    projectileVelocity: 1000,
    spin: 0,
    mass: 0,
    damage: 15,
    fireRate: 50, //lower is better
    spriteKey: "flamestream",
    audioSpriteKey: "bullet-sound",
    audioFireKey: "shot1",
    audioBounceKey: "bounce1",
    audioHitKey: "bounce1",
    bounce: 0,
    hitEnemies: true,
    hitWalls: true,
    hitDestructibles: true,
    destroyOnWallTouch: false,
}

class FlameThrower extends Weapon {
    constructor(config) {
        const finalConfig = {};
        Object.assign(finalConfig, FLAMETHROWER_DEFAULT_STATS);
        Object.assign(finalConfig, config);
        super(finalConfig);
    }
}

module.exports = FlameThrower;