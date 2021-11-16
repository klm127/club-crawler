/**
 * These simulate some parts of phaser object structures, purely for testing purposes
 */


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
            }
        }
    }
}

scene.textures.list["popper-inventory"].frames.__BASE.source.source.src = "images/popper64x64.png"