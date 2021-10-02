import Phaser from "phaser";

class Target extends Phaser.GameObjects.Image {

    /**
     * Description
     * @param {Phaser.Scene} scene
     */
    static preload(scene) {
        console.log('preload target');
        scene.load.image('cylinder', 'images/cylinder.png');
        console.log('target preloaded');
    }

    constructor(config) {
        super(config.scene, config.x, config.y, 'cylinder');
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

    }
}

module.exports = Target;