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

/**
 * sets the image references in scene as they would be in the game after they load
 */
setTimeout( ()=> {
    let popperSrc = document.getElementById("referenceImagePopper")
    scene.textures.list["popper-inventory"].frames.__BASE.source.source.src = popperSrc.src;
    popperSrc.style.display = "none";
    let flamethrowerSrc = document.getElementById("referenceImageFlamethrower");
    scene.textures.list["flamethrower"].frames.__BASE.source.source.src = flamethrowerSrc.src;
    flamethrowerSrc.style.display = "none";
    let bluePotionSrc = document.getElementById("referenceImageBluePotion");
    scene.textures.list["blue-potion"].frames.__BASE.source.source.src = bluePotionSrc.src
    bluePotionSrc.style.display = "none";


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
const dataManager = {
    score: 0,
    health: 0,
    emitter: new GeneralStub({"emit": function(s) {console.log(`emit: ${s}`)}}),
    sfxVolume: 1,
    
    settings: {
        sound: {
            sfxVol: {
                name: "Sound Effects Volume",
                type: "number",
                value: 1,
                min: 0,
                max: 2,
                increment: 0.1
            },
            musicVol: {
                name: "Music Volume",
                type: "number",
                value: 0.5,
                min: 0,
                max: 2,
                increment: 0.1
            }
        }
    },
    musicVolume: 0.5,
    debug: {
        on: true,
        duration: 3000, //how long a message stays on the screen,
        debugLines: [],
        max: 10, //how many messages can appear
        weapon: {
            sound: false,
        },
        items: {
            overlap: true
        },
        enemies: {
            die: true
        },
        destructibles: {
            cylinder: false,
            colliders: false
        },
        logic: {
            win: false
        },
        map: {
            placePlayer: false,
            layers: false,
            functions: false,
        },
        player: {
            construction: false
        }
    },
    debugLines: ['debug'],
    /**
     * Changes the score and emits the 'scoreChange' event.
     * @param {number} change - The amount to change the score by.
     * @returns {number} - The data manager score
     */
    changeScore: function(change) {
        dataManager.score += change;
        emitter.emit('scoreChange');
        return dataManager.score;
    }, 
    changeHealth: function(change) {
        dataManager.health += change;
        emitter.emit('healthChange');
    },
    log: function(newText) {
        if(dataManager.debug.on) {
            dataManager.debugLines.push(newText);
            dataManager.debug.debugLines.push(newText);
            dataManager.emitter.emit('debugChange');
        }
    }
    
};

console.log('stubs created');

module.exports = {
    Player: PlayerStub,
    GeneralStub: GeneralStub,
    FLAME_DEFAULTS: FLAME_DEFAULTS,
    dataManager: dataManager
}