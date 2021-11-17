/**
 * These simulate some parts of phaser and club crawler object structures, for testing the UI mockup
 */

const Inventory = require('../src/objects/player/inventory');

const scene = {
    textures: {
        list: {
            "popper-inventory": {
                frames: {
                    __BASE: {
                        source: {
                            source: new Image(64,64)
                        }
                    }
                }
            },
            "flamethrower": {
                frames: {
                    __BASE: {
                        source: {
                            source: new Image(64,64)
                        }
                    }
                }
            },
            "blue-potion": {
                frames: {
                    __BASE: {
                        source: {
                            source: new Image(64,64)
                        }
                    }
                }
            }

        }
    }
}

setTimeout( ()=> {
    let popperSrc = document.getElementById("referenceImagePopper")
    scene.textures.list["popper-inventory"].frames.__BASE.source.source.src = popperSrc.src;
    let flamethrowerSrc = document.getElementById("referenceImageFlamethrower");
    scene.textures.list["flamethrower"].frames.__BASE.source.source.src = flamethrowerSrc.src;
    let bluePotionSrc = document.getElementById("referenceImageBluePotion");
    scene.textures.list["blue-potion"].frames.__BASE.source.source.src = bluePotionSrc.src


}, 500)


class GeneralStub {
    constructor(config) {
        Object.assign(this, config);
    }
}

const WEAP_DEFAULTS = {
    name: "popper",
    description: "Could knock over some soda cans, at least",
    duration: 1000,
    projectileVelocity: 1000,
    spin: 2000,
    mass: 0.1,
    damage: 20,
    fireRate: 300,
    spriteKey: "bullet",
    audioSpriteKey: "bullet-sound",
    audioFireKey: "shot1",
    audioBounceKey: "bounce1",
    audioHitKey: "bounce1",
    bounce: 0.3,
    hitEnemies: true,
    overlapEnemies: false,
    hitWalls: true,
    hitPlayer: false,
    overlapPlayer: false,
    hitDestructibles: true,
    overlapDestructibles: false,
    destroyOnWallTouch: false,
    inventorySprite: "popper-inventory",
    itemType: "weapon"
}

const FLAME_DEFAULTS = {
    name: "flamethrower",
    description: "Easy to light your hair on fire with this sizzler.",
    duration: 420,
    projectileVelocity: 550,
    spin: -150,
    mass: 0,
    damage: .06, // doesnt need a lot cause overlaps trigger a bunch
    fireRate: 20, //lower is faster
    spriteKey: "flamestream",
    audioSpriteKey: "flame-sound",
    audioFireKey: "fire",
    audioBounceKey: "hit",
    audioHitKey: "hit",
    bounce: 0,
    hitEnemies: false,
    overlapEnemies: true,
    hitWalls: true,
    hitDestructibles: false,
    overlapDestructibles: true,
    hitPlayer: false,
    overlapPlayer: true,
    destroyOnWallTouch: false,
    initialFlameScale: 0.5, // not working for some reason - have to apply directly
    finalFlameScale: 1,
    inventorySprite: "flamethrower",
    itemType: "weapon" //inherited in regular game, copied for stubs
}

class PlayerStub {
    constructor(config) {
        Object.assign(this, this.config);
        this.reticle = "reticle placeholder";
        this.weapon = new GeneralStub(WEAP_DEFAULTS);
        this.weapon.scene = scene;
        this.weapon.wielder = this;
        this.weapon.reticle = this.reticle;
        this.inventory = new Inventory({
            player:this,
            reticle: this.reticle,
            scene: scene
        })
        this.inventory.addItem(this.weapon);
        this.health = 100;
        
    }
}
console.log('stubs created');

module.exports = {
    Player: PlayerStub,
    GeneralStub: GeneralStub,
    FLAME_DEFAULTS: FLAME_DEFAULTS
}